import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, AlertCircle } from "lucide-react"
import type { Alert } from "@/app/actions/alerts"

function AlertItem({ alert }: { alert: Alert }) {
  const isCritique = alert.severity === "critique"
  return (
    <div className={`flex gap-3 p-3 rounded-lg border ${isCritique ? "border-destructive/30 bg-destructive/5" : "border-orange-200 bg-orange-50 dark:border-orange-900/30 dark:bg-orange-950/20"}`}>
      {isCritique ? (
        <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
      ) : (
        <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
      )}
      <div className="space-y-0.5 min-w-0">
        <p className="text-sm font-medium truncate">{alert.patientName}</p>
        <p className="text-xs text-muted-foreground">{alert.message}</p>
      </div>
      <Badge
        variant={isCritique ? "destructive" : "secondary"}
        className={`shrink-0 text-[10px] h-5 self-start ${!isCritique ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400 border-0" : ""}`}
      >
        {alert.severity}
      </Badge>
    </div>
  )
}

export function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  const critiques = alerts.filter((a) => a.severity === "critique")
  const attentions = alerts.filter((a) => a.severity === "attention")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Alertes IA</CardTitle>
        <div className="flex items-center gap-2">
          {alerts.length > 0 && (
            <Badge variant={critiques.length > 0 ? "destructive" : "secondary"}>
              {alerts.length}
            </Badge>
          )}
          <Bell className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
            <Bell className="h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">Aucune alerte — toutes les constantes sont normales.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {critiques.map((a) => <AlertItem key={a.patientId + a.message} alert={a} />)}
            {attentions.map((a) => <AlertItem key={a.patientId + a.message} alert={a} />)}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
