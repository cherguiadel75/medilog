import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { PatientInfo } from "@/components/patients/PatientInfo"
import { ConstantesHistory } from "@/components/patients/ConstantesHistory"
import { AddConstanteForm } from "@/components/patients/AddConstanteForm"
import { Button } from "@/components/ui/button"

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: patient } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .eq("practitioner_id", user!.id)
    .single()

  if (!patient) notFound()

  const { data: constantes } = await supabase
    .from("constantes")
    .select("*")
    .eq("patient_id", id)
    .order("measured_at", { ascending: false })

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/patients">← Retour</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          {patient.prenom} {patient.nom}
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <PatientInfo patient={patient} />
          <AddConstanteForm patientId={id} />
        </div>
        <div className="lg:col-span-2">
          <ConstantesHistory constantes={constantes ?? []} />
        </div>
      </div>
    </div>
  )
}
