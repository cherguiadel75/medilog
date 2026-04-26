"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { addPatient } from "@/app/actions/patients"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Enregistrement..." : "Enregistrer le patient"}
    </Button>
  )
}

export function PatientForm() {
  const [error, setError] = useState<string | null>(null)

  async function handleAction(formData: FormData) {
    setError(null)
    const result = await addPatient(formData)
    if (result?.error) setError(result.error)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={handleAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="nom">Nom</Label>
              <Input id="nom" name="nom" placeholder="Dupont" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="prenom">Prénom</Label>
              <Input id="prenom" name="prenom" placeholder="Marie" required />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="date_naissance">Date de naissance</Label>
            <Input id="date_naissance" name="date_naissance" type="date" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input id="telephone" name="telephone" type="tel" placeholder="06 12 34 56 78" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
