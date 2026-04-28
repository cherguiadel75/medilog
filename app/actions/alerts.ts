"use server"

import { createClient } from "@/lib/supabase/server"
import { anthropic } from "@/lib/anthropic"

export type Alert = {
  patientId: string
  patientName: string
  severity: "critique" | "attention"
  message: string
}

type PatientWithConstante = {
  id: string
  nom: string
  prenom: string
  tension_systolique: number | null
  tension_diastolique: number | null
  frequence_cardiaque: number | null
  temperature: number | null
  poids: number | null
  measured_at: string
}

export async function getAIAlerts(): Promise<Alert[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  // Fetch latest constante per patient (most recent only)
  const { data: rows } = await supabase
    .from("constantes")
    .select(`
      patient_id,
      tension_systolique,
      tension_diastolique,
      frequence_cardiaque,
      temperature,
      poids,
      measured_at,
      patients!inner(id, nom, prenom, practitioner_id)
    `)
    .eq("patients.practitioner_id", user.id)
    .order("measured_at", { ascending: false })

  if (!rows || rows.length === 0) return []

  // Keep only the most recent constante per patient
  const seen = new Set<string>()
  const latest: PatientWithConstante[] = []
  for (const row of rows) {
    const patient = (Array.isArray(row.patients) ? row.patients[0] : row.patients) as { id: string; nom: string; prenom: string; practitioner_id: string }
    if (!seen.has(row.patient_id)) {
      seen.add(row.patient_id)
      latest.push({
        id: patient.id,
        nom: patient.nom,
        prenom: patient.prenom,
        tension_systolique: row.tension_systolique,
        tension_diastolique: row.tension_diastolique,
        frequence_cardiaque: row.frequence_cardiaque,
        temperature: row.temperature,
        poids: row.poids,
        measured_at: row.measured_at,
      })
    }
  }

  if (latest.length === 0) return []

  const patientsData = latest
    .map((p) => {
      const parts: string[] = [`Patient: ${p.prenom} ${p.nom} (id: ${p.id})`]
      if (p.tension_systolique && p.tension_diastolique)
        parts.push(`  Tension: ${p.tension_systolique}/${p.tension_diastolique} mmHg`)
      if (p.frequence_cardiaque)
        parts.push(`  FC: ${p.frequence_cardiaque} bpm`)
      if (p.temperature)
        parts.push(`  Température: ${p.temperature}°C`)
      if (p.poids)
        parts.push(`  Poids: ${p.poids} kg`)
      return parts.join("\n")
    })
    .join("\n\n")

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 1024,
      thinking: { type: "adaptive" },
      system: [
        {
          type: "text",
          text: `Tu es un assistant médical. Analyse les constantes vitales des patients et génère des alertes uniquement si des valeurs sont anormales.

Seuils d'alerte :
- Tension systolique > 140 mmHg OU diastolique > 90 mmHg → ATTENTION (> 160/100 → CRITIQUE)
- Fréquence cardiaque < 50 bpm ou > 100 bpm → ATTENTION (< 40 ou > 130 → CRITIQUE)
- Température > 38.5°C → ATTENTION (> 39.5°C → CRITIQUE)

Réponds UNIQUEMENT en JSON valide, sans markdown, sans explication :
[
  {
    "patientId": "uuid-du-patient",
    "patientName": "Prénom Nom",
    "severity": "critique" | "attention",
    "message": "Description courte en français de l'anomalie"
  }
]

Si aucune anomalie : réponds []`,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        {
          role: "user",
          content: `Analyse ces constantes vitales :\n\n${patientsData}`,
        },
      ],
    })

    const textBlock = response.content.find((b) => b.type === "text")
    if (!textBlock || textBlock.type !== "text") return []

    const parsed = JSON.parse(textBlock.text.trim())
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
