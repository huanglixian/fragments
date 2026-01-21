import { Template, waitForPort } from 'e2b'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const template = Template()
  .fromNodeImage('24-slim')
  .aptInstall(['curl', 'git']) // required for waitForPort()
  .setWorkdir('/home/user')
  .runCmd(
    'npx nuxi@latest init . --template minimal --packageManager=npm --gitInit=no -f --modules tailwindcss',
  )
  .runCmd(
    `cat <<'EOF' > /home/user/nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore Ignored to pass Vercel deployment
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  vite: {
    server: {
      allowedHosts: ['.e2b-zulu.dev', '.e2b.dev', '.e2b.app'],
      hmr: {
        protocol: 'wss',
      },
    },
  },
})
EOF`,
  )
  .setStartCmd('npm run dev', waitForPort(3000))
