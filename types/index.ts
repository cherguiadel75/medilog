export type Patient = {
  id: string
  practitioner_id: string
  nom: string
  prenom: string
  date_naissance: string | null
  telephone: string | null
  created_at: string
  updated_at: string
}

export type Constante = {
  id: string
  patient_id: string
  practitioner_id: string
  tension_systolique: number | null
  tension_diastolique: number | null
  frequence_cardiaque: number | null
  temperature: number | null
  poids: number | null
  notes: string | null
  measured_at: string
}

export type Profile = {
  id: string
  full_name: string | null
  email: string | null
  created_at: string
}
