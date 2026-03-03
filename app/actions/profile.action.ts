"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface ProfileData {
    id: string;
    display_name: string;
    bio: string;
    core_strengths: string;
    beyond_coding: string;
    future_vision: string;
    portrait_url: string | null;
    updated_at: string;
}

export async function getProfile(): Promise<ProfileData | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .single();

    if (error) {
        console.error("Error fetching profile:", error.message);
        return null;
    }

    return data as ProfileData;
}

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();

    const display_name = formData.get("display_name") as string;
    const bio = formData.get("bio") as string;
    const core_strengths = formData.get("core_strengths") as string;
    const beyond_coding = formData.get("beyond_coding") as string;
    const future_vision = formData.get("future_vision") as string;
    const portrait_url = (formData.get("portrait_url") as string) || null;

    // Get the existing profile id first
    const { data: existing } = await supabase
        .from("profile")
        .select("id")
        .limit(1)
        .single();

    if (!existing) {
        throw new Error("Profile not found. Please run the SQL migration first.");
    }

    const { error } = await supabase
        .from("profile")
        .update({
            display_name,
            bio,
            core_strengths,
            beyond_coding,
            future_vision,
            portrait_url,
            updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

    if (error) {
        console.error("Error updating profile:", error.message);
        throw new Error(error.message);
    }

    revalidatePath("/admin/profile");
    revalidatePath("/");
}
