import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { PatientSearch } from "@/components/patients/PatientSearch"
import { Button } from "@/components/ui/button"

export default async function PatientsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: patients } = await supabase
    .from("patients")
    .select("*")
    .eq("practitioner_id", user!.id)
    .order("nom", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground text-sm">{patients?.length ?? 0} patient(s) enregistré(s)</p>
        </div>
        <Button asChild>
          <Link href="/patients/new">+ Nouveau patient</Link>
        </Button>
      </div>

      <PatientSearch patients={patients ?? []} />
    </div>
  )
}
