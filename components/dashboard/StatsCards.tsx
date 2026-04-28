import { Card, CardContent } from "@/components/ui/card"
import { Users, Activity, Calendar } from "lucide-react"

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
}: {
  title: string
  value: string | number
  subtitle: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
}) {
  return (
    <Card className="shadow-sm border-border/60">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-[#1e3a5f]">{value}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${iconBg}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards({ totalPatients }: { totalPatients: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total patients"
        value={totalPatients}
        subtitle="patients enregistrés"
        icon={Users}
        iconColor="text-[#2563eb]"
        iconBg="bg-[#eff6ff]"
      />
      <StatCard
        title="Consultations"
        value="—"
        subtitle="cette semaine"
        icon={Calendar}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-50"
      />
      <StatCard
        title="Constantes"
        value="—"
        subtitle="enregistrées"
        icon={Activity}
        iconColor="text-violet-600"
        iconBg="bg-violet-50"
      />
    </div>
  )
}
