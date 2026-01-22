import './globals.css'
import { PostHogProvider, ThemeProvider } from './providers'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GDY-AppBuilder',
  description: "Open-source version of Anthropic's Artifacts",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <PostHogProvider>
        <body
          style={{
            fontFamily:
              '"PingFang SC", "Noto Sans SC", "Microsoft YaHei", "Source Han Sans SC", "Heiti SC", sans-serif',
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
          <Analytics />
        </body>
      </PostHogProvider>
    </html>
  )
}
