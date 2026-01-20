import { Separator } from './ui/separator'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function RepoBanner({ className }: { className?: string }) {
  return (
    <div
      aria-label="Banner"
      className={cn(
        'bg-background overflow-hidden px-3 py-1 rounded-t-2xl',
        'gap-2 flex items-center border border-b-0',
        'transform-y-1 group relative',
        'before:absolute before:inset-0 dark:before:bg-[radial-gradient(circle_at_10%_-50%,rgba(255,255,255,0.1),transparent_10%)] before:rounded-t-2xl before:pointer-events-none',
        className,
      )}
    >
      <Image
        src="/gdy/Ai-sp.png"
        alt="AI"
        width={16}
        height={16}
        className="w-4 h-4"
      />
      <Separator
        orientation="vertical"
        className="h-6 bg-[hsl(var(--border))]"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-foreground tracking-wide">
        说出你的需求，AI帮你实现
      </p>
    </div>
  )
}
