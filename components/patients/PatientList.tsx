"use client"

import Link from "next/link"
import type { Patient } from "@/types"
import { deletePatient } from "@/app/actions/patients"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("fr-FR")
}

export function PatientList({ patients }: { patients: Patient[] }) {
  if (patients.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
          <p className="text-muted-foreground text-sm">Aucun patient enregistré.</p>
          <Button asChild>
            <Link href="/patients/new">Ajouter mon premier patient</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Prénom</TableHead>
              <TableHead>Date de naissance</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.nom}</TableCell>
                <TableCell>{patient.prenom}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(patient.date_naissance)}</TableCell>
                <TableCell className="text-muted-foreground">{patient.telephone ?? "—"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/patients/${patient.id}`}>Voir</Link>
                    </Button>
                    <form
                      action={async () => {
                        if (confirm(`Supprimer ${patient.prenom} ${patient.nom} ?`)) {
                          await deletePatient(patient.id)
                        }
                      }}
                    >
                      <Button variant="ghost" size="sm" type="submit" className="text-destructive hover:text-destructive">
                        Supprimer
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
