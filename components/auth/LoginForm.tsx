"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { login } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Connexion..." : "Se connecter"}
    </Button>
  )
}

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  async function handleAction(formData: FormData) {
    setError(null)
    setValidationError(null)

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email.includes("@") || !email.includes(".")) {
      setValidationError("Adresse email invalide")
      return
    }
    if (password.length < 8) {
      setValidationError("Le mot de passe doit contenir au moins 8 caractères")
      return
    }

    const result = await login(formData)
    if (result?.error) setError(result.error)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Connexion</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleAction} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="praticien@exemple.fr" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          {validationError && (
            <p className="text-sm text-destructive">{validationError}</p>
          )}
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
