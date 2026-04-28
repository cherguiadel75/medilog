"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function addConstante(patientId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const getValue = (key: string) => {
    const v = formData.get(key) as string
    return v ? parseFloat(v) : null
  }

  const { error } = await supabase.from("constantes").insert({
    patient_id: patientId,
    practitioner_id: user.id,
    tension_systolique: getValue("tension_systolique"),
    tension_diastolique: getValue("tension_diastolique"),
    frequence_cardiaque: getValue("frequence_cardiaque"),
    temperature: getValue("temperature"),
    poids: getValue("poids"),
    notes: (formData.get("notes") as string) || null,
  })

  if (error) return { error: error.message }

  revalidatePath(`/patients/${patientId}`)
}
