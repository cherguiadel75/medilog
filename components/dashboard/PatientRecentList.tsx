import Link from "next/link"
import type { Patient } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function PatientRecentList({ patients }: { patients: Patient[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Patients récents</CardTitle>
        <Button asChild size="sm" variant="outline">
          <Link href="/patients">Voir tous</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {patients.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Aucun patient pour l&apos;instant.{" "}
            <Link href="/patients/new" className="underline underline-offset-4 hover:text-primary">
              Ajouter un patient
            </Link>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.nom}</TableCell>
                  <TableCell>{patient.prenom}</TableCell>
                  <TableCell className="text-muted-foreground">{patient.telephone ?? "—"}</TableCell>
                  <TableCell>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/patients/${patient.id}`}>Voir</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
