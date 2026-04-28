import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1e3a5f] flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 border border-white/20">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-white">
              <rect x="8" y="3" width="4" height="14" rx="1" />
              <rect x="3" y="8" width="14" height="4" rx="1" />
            </svg>
          </div>
          <span className="font-bold text-2xl text-white tracking-tight">MediLog</span>
        </div>
        <div className="space-y-4">
          <blockquote className="text-white/90 text-xl font-light leading-relaxed">
            &ldquo;Gérez vos patients, leurs constantes vitales et les alertes médicales en un seul endroit.&rdquo;
          </blockquote>
          <p className="text-white/50 text-sm">Plateforme de suivi patient pour médecins et infirmiers libéraux</p>
        </div>
        <div className="text-white/30 text-xs">© {new Date().getFullYear()} MediLog</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden flex items-center gap-2.5 justify-center">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1e3a5f]">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
                <rect x="8" y="3" width="4" height="14" rx="1" />
                <rect x="3" y="8" width="14" height="4" rx="1" />
              </svg>
            </div>
            <span className="font-bold text-xl text-[#1e3a5f]">MediLog</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Connexion</h1>
            <p className="text-muted-foreground text-sm mt-1">Accédez à votre espace praticien</p>
          </div>
          <LoginForm />
          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href="/register" className="text-[#2563eb] font-medium hover:underline underline-offset-4">
              S&apos;inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
