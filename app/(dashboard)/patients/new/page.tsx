import Link from "next/link"
import { PatientForm } from "@/components/patients/PatientForm"
import { Button } from "@/components/ui/button"

export default function NewPatientPage() {
  return (
    <div className="space-y-6 max-w-lg">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/patients">← Retour</Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nouveau patient</h1>
          <p className="text-muted-foreground text-sm">Remplir les informations du patient</p>
        </div>
      </div>
      <PatientForm />
    </div>
  )
}
