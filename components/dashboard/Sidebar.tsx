"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { logout } from "@/app/actions/auth"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, LogOut, Menu, X } from "lucide-react"

const navLinks = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/patients", label: "Patients", icon: Users },
]

function MedicalCrossLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 border border-white/20 shrink-0">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
          <rect x="8" y="3" width="4" height="14" rx="1" />
          <rect x="3" y="8" width="14" height="4" rx="1" />
        </svg>
      </div>
      <span className="font-bold text-lg tracking-tight text-white">MediLog</span>
    </div>
  )
}

function SidebarContent({ user, onClose }: { user: User; onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-[#1e3a5f]">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/dashboard" onClick={onClose}>
          <MedicalCrossLogo />
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(link.href + "/")
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-white/20 text-white"
                  : "text-white/65 hover:text-white hover:bg-white/10"
              )}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer — user + logout */}
      <div className="px-3 pb-5 pt-3 border-t border-white/10 space-y-1">
        <p className="text-xs text-white/40 px-3 py-1 truncate">{user.email}</p>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/65 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Déconnexion
          </button>
        </form>
      </div>
    </div>
  )
}

export function Sidebar({ user }: { user: User }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar — fixed */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-60 z-40 shadow-xl">
        <SidebarContent user={user} />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#1e3a5f] z-40 flex items-center justify-between px-4 shadow-md">
        <Link href="/dashboard">
          <MedicalCrossLogo />
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "md:hidden fixed inset-y-0 left-0 w-60 z-50 shadow-2xl transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent user={user} onClose={() => setOpen(false)} />
      </aside>
    </>
  )
}
