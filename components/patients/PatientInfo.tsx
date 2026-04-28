import type { Patient } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Phone, Calendar } from "lucide-react"

export function PatientInfo({ patient }: { patient: Patient }) {
  const age = patient.date_naissance
    ? Math.floor((Date.now() - new Date(patient.date_naissance).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <User className="h-4 w-4" />
          Informations patient
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground w-24 shrink-0">Nom complet</span>
          <span className="font-medium">{patient.prenom} {patient.nom}</span>
        </div>
        {patient.date_naissance && (
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground w-20 shrink-0">Naissance</span>
            <span>
              {new Date(patient.date_naissance).toLocaleDateString("fr-FR")}
              {age !== null && <span className="text-muted-foreground ml-1">({age} ans)</span>}
            </span>
          </div>
        )}
        {patient.telephone && (
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground w-20 shrink-0">Tél.</span>
            <span>{patient.telephone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 pt-1 border-t">
          <span className="text-muted-foreground w-24 shrink-0">Depuis</span>
          <span className="text-muted-foreground text-xs">
            {new Date(patient.created_at).toLocaleDateString("fr-FR")}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
