"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { register } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Création en cours..." : "Créer mon compte"}
    </Button>
  )
}

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)

  async function handleAction(formData: FormData) {
    setError(null)
    const result = await register(formData)
    if (result?.error) setError(result.error)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Inscription</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleAction} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="full_name">Nom complet</Label>
            <Input id="full_name" name="full_name" placeholder="Dr. Marie Dupont" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="praticien@exemple.fr" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" name="password" type="password" placeholder="8 caractères minimum" required minLength={8} />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
