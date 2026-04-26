import Link from "next/link"
import { RegisterForm } from "@/components/auth/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">MediLog</h1>
          <p className="text-sm text-muted-foreground mt-1">Créer votre espace praticien</p>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
