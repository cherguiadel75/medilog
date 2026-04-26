import { createClient } from "@/lib/supabase/server"
import { PatientRecentList } from "@/components/dashboard/PatientRecentList"
import { AlertsPanel } from "@/components/dashboard/AlertsPanel"
import { StatsCards } from "@/components/dashboard/StatsCards"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: patients } = await supabase
    .from("patients")
    .select("*")
    .eq("practitioner_id", user!.id)
    .order("created_at", { ascending: false })

  const recentPatients = patients?.slice(0, 5) ?? []
  const totalPatients = patients?.length ?? 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm">Bienvenue, vue d&apos;ensemble de vos patients</p>
      </div>

      <StatsCards totalPatients={totalPatients} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PatientRecentList patients={recentPatients} />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </div>
    </div>
  )
}
