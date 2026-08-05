import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
        <div className="px-4 py-2 text-3xl font-extrabold tracking-tight text-sky-400">
            ExpensiTrack
        </div>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="text-foreground transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="#" className="text-foreground transition-colors hover:text-primary">
            Expenses
          </Link>
          <Link href="#" className="text-foreground transition-colors hover:text-primary">
            Analytics
          </Link>
        </nav>
      </div>
    </header>
  )
}
