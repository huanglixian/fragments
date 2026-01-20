import Image from 'next/image'

export type LogoStyle = 'e2b' | 'fragments'

type LogoProps = {
  style?: LogoStyle
  width?: number
  height?: number
  className?: string
}

export default function Logo({
  width = 24,
  height = 24,
  className,
}: LogoProps) {
  return (
    <Image
      src="/gdy/Ai-logo.png"
      alt="Logo"
      width={width}
      height={height}
      className={className}
    />
  )
}
