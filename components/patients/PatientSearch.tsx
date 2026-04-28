"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { PatientList } from "./PatientList"
import type { Patient } from "@/types"

export function PatientSearch({ patients }: { patients: Patient[] }) {
  const [query, setQuery] = useState("")

  const filtered = query.trim()
    ? patients.filter((p) => {
        const q = query.toLowerCase()
        return (
          p.nom.toLowerCase().includes(q) ||
          p.prenom.toLowerCase().includes(q) ||
          (p.telephone ?? "").includes(q)
        )
      })
    : patients

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Rechercher par nom, prénom ou téléphone…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      {query.trim() && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} résultat{filtered.length !== 1 ? "s" : ""} pour &quot;{query}&quot;
        </p>
      )}
      <PatientList patients={filtered} />
    </div>
  )
}
