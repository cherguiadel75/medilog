import type { Constante } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"

function StatBadge({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="flex flex-col items-center bg-muted/50 rounded-md px-3 py-2 min-w-[80px]">
      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="font-semibold text-sm">{value}</span>
      <span className="text-[10px] text-muted-foreground">{unit}</span>
    </div>
  )
}

export function ConstantesHistory({ constantes }: { constantes: Constante[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Historique des constantes
        </CardTitle>
        <Badge variant="secondary">{constantes.length} entrée(s)</Badge>
      </CardHeader>
      <CardContent>
        {constantes.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-10">
            Aucune constante enregistrée. Utilisez le bouton ci-contre pour en ajouter.
          </p>
        ) : (
          <div className="space-y-3">
            {constantes.map((c) => (
              <div key={c.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(c.measured_at).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.tension_systolique && c.tension_diastolique && (
                    <StatBadge
                      label="Tension"
                      value={`${c.tension_systolique}/${c.tension_diastolique}`}
                      unit="mmHg"
                    />
                  )}
                  {c.frequence_cardiaque && (
                    <StatBadge label="FC" value={String(c.frequence_cardiaque)} unit="bpm" />
                  )}
                  {c.temperature && (
                    <StatBadge label="Temp." value={String(c.temperature)} unit="°C" />
                  )}
                  {c.poids && (
                    <StatBadge label="Poids" value={String(c.poids)} unit="kg" />
                  )}
                </div>
                {c.notes && (
                  <p className="text-xs text-muted-foreground border-t pt-2">{c.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
