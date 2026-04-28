"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { addConstante } from "@/app/actions/constantes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" size="sm" disabled={pending}>
      {pending ? "Enregistrement..." : "Enregistrer"}
    </Button>
  )
}

export function AddConstanteForm({ patientId }: { patientId: string }) {
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  async function handleAction(formData: FormData) {
    setError(null)
    const result = await addConstante(patientId, formData)
    if (result?.error) {
      setError(result.error)
    } else {
      setOpen(false)
    }
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} className="w-full" variant="outline">
        <PlusCircle className="h-4 w-4 mr-2" />
        Nouvelle constante
      </Button>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Nouvelle constante
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleAction} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Tension (mmHg)</Label>
            <div className="flex gap-2">
              <Input name="tension_systolique" type="number" placeholder="Sys. ex: 120" className="text-sm" />
              <Input name="tension_diastolique" type="number" placeholder="Dia. ex: 80" className="text-sm" />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="frequence_cardiaque" className="text-xs">Fréquence cardiaque (bpm)</Label>
            <Input id="frequence_cardiaque" name="frequence_cardiaque" type="number" placeholder="ex: 72" className="text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="temperature" className="text-xs">Température (°C)</Label>
              <Input id="temperature" name="temperature" type="number" step="0.1" placeholder="ex: 37.2" className="text-sm" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="poids" className="text-xs">Poids (kg)</Label>
              <Input id="poids" name="poids" type="number" step="0.1" placeholder="ex: 70.5" className="text-sm" />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="notes" className="text-xs">Notes</Label>
            <Input id="notes" name="notes" placeholder="Observations..." className="text-sm" />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="sm" className="flex-1" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <div className="flex-1">
              <SubmitButton />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
