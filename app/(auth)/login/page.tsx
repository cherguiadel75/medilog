import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">MediLog</h1>
          <p className="text-sm text-muted-foreground mt-1">Connexion à votre espace praticien</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}
