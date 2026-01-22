import { handleAPIError, createRateLimitResponse } from '@/lib/api-errors'
import { Duration } from '@/lib/duration'
import { getModelClient, LLMModel, LLMModelConfig } from '@/lib/models'
import { toPrompt } from '@/lib/prompt'
import ratelimit from '@/lib/ratelimit'
import { fragmentSchema as schema } from '@/lib/schema'
import { Templates } from '@/lib/templates'
import { streamObject, generateText, LanguageModel, CoreMessage } from 'ai'

export const maxDuration = 300

const rateLimitMaxRequests = process.env.RATE_LIMIT_MAX_REQUESTS
  ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
  : 10
const ratelimitWindow = process.env.RATE_LIMIT_WINDOW
  ? (process.env.RATE_LIMIT_WINDOW as Duration)
  : '1d'

export async function POST(req: Request) {
  const {
    messages,
    userID,
    teamID,
    template,
    model,
    config,
  }: {
    messages: CoreMessage[]
    userID: string | undefined
    teamID: string | undefined
    template: Templates
    model: LLMModel
    config: LLMModelConfig
  } = await req.json()

  const limit = !config.apiKey
    ? await ratelimit(
        req.headers.get('x-forwarded-for'),
        rateLimitMaxRequests,
        ratelimitWindow,
      )
    : false

  if (limit) {
    return createRateLimitResponse(limit)
  }

  console.log('userID', userID)
  console.log('teamID', teamID)
  // console.log('template', template)
  console.log('model', model)
  // console.log('config', config)

  const { model: modelNameString, apiKey: modelApiKey, ...modelParams } = config
  const modelClient = getModelClient(model, config)

  try {
    const stream = await streamObject({
      model: modelClient as LanguageModel,
      schema,
      system: toPrompt(template),
      messages,
      maxRetries: 0, // do not retry on errors
      ...modelParams,
    })

    if (model.id === 'doubao-seed-code-preview-251028') {
      generateText({
        model: modelClient as LanguageModel,
        system: toPrompt(template),
        messages,
        maxRetries: 0,
        ...modelParams,
      })
        .then((result) => {
          console.log('doubao raw output', result.text.slice(0, 2000))
        })
        .catch((logError) => {
          console.log('doubao raw output error', logError)
        })
    }

    return stream.toTextStreamResponse()
  } catch (error: any) {
    if (model.id === 'doubao-seed-code-preview-251028') {
      try {
        const result = await generateText({
          model: modelClient as LanguageModel,
          system: toPrompt(template),
          messages,
          maxRetries: 0,
          ...modelParams,
        })
        console.log('doubao raw output', result.text.slice(0, 2000))
      } catch (logError) {
        console.log('doubao raw output error', logError)
      }
    }
    return handleAPIError(error, { hasOwnApiKey: !!config.apiKey })
  }
}
