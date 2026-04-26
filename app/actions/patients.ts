"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function addPatient(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { error } = await supabase.from("patients").insert({
    practitioner_id: user.id,
    nom: formData.get("nom") as string,
    prenom: formData.get("prenom") as string,
    date_naissance: (formData.get("date_naissance") as string) || null,
    telephone: (formData.get("telephone") as string) || null,
  })

  if (error) return { error: error.message }

  revalidatePath("/patients")
  revalidatePath("/dashboard")
  redirect("/patients")
}

export async function deletePatient(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  await supabase.from("patients").delete().eq("id", id).eq("practitioner_id", user.id)

  revalidatePath("/patients")
  revalidatePath("/dashboard")
}
