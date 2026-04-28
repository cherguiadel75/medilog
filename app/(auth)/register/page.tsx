import Link from "next/link"
import { RegisterForm } from "@/components/auth/RegisterForm"

export default function RegisterPage() {
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
        <div className="space-y-6">
          <div className="space-y-3">
            {["Suivi des constantes vitales en temps réel", "Alertes IA automatiques", "Historique complet par patient"].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
                {feature}
              </div>
            ))}
          </div>
          <p className="text-white/50 text-sm">Rejoignez les praticiens qui font confiance à MediLog</p>
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
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Créer un compte</h1>
            <p className="text-muted-foreground text-sm mt-1">Commencez gratuitement dès aujourd&apos;hui</p>
          </div>
          <RegisterForm />
          <p className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-[#2563eb] font-medium hover:underline underline-offset-4">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
