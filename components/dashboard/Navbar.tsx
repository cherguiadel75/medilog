"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { logout } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function MedicalCrossLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/15 border border-white/20">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
          <rect x="8" y="3" width="4" height="14" rx="1" />
          <rect x="3" y="8" width="14" height="4" rx="1" />
        </svg>
      </div>
      <span className="font-bold text-lg tracking-tight text-white">MediLog</span>
    </div>
  )
}

const navLinks = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/patients", label: "Patients" },
]

export function Navbar({ user }: { user: User }) {
  const pathname = usePathname()

  return (
    <header className="bg-[#1e3a5f] border-b border-white/10 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/dashboard">
            <MedicalCrossLogo />
          </Link>
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/60 hidden sm:block">{user.email}</span>
          <form action={logout}>
            <Button
              variant="outline"
              size="sm"
              type="submit"
              className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white/50"
            >
              Déconnexion
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
