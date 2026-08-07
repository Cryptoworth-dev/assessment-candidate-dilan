import type { ReactNode } from "react"

interface PageContainerProps {
  children: ReactNode
}

export default function PageContainer({ children }: PageContainerProps) {
  return <main className="flex-1 bg-muted/5 text-foreground">{children}</main>
}
