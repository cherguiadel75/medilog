import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

export function AlertsPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Alertes</CardTitle>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
          <Badge variant="secondary">Phase 2</Badge>
          <p className="text-sm text-muted-foreground">
            Les alertes IA sur les constantes seront disponibles dans la prochaine version.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
