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

export type Profile = {
  id: string
  full_name: string | null
  email: string | null
  created_at: string
}
