import { Button } from '@/components/ui/button'
import { loginAction } from './actions'

type LoginPageProps = {
  searchParams?: {
    next?: string
    error?: string
  }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const next =
    typeof searchParams?.next === 'string' ? searchParams.next : '/'
  const hasError = searchParams?.error === '1'

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <form
        action={loginAction}
        className="w-full max-w-sm space-y-4 rounded-md border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-neutral-900">访问验证</h1>
          <p className="text-sm text-neutral-500">
            请输入访问密码继续
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            密码
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
            placeholder="请输入密码"
          />
          {hasError ? (
            <p className="text-sm text-red-600">密码不正确</p>
          ) : null}
        </div>
        <input type="hidden" name="next" value={next} />
        <Button type="submit" className="w-full">
          进入
        </Button>
      </form>
    </div>
  )
}
