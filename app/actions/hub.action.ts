"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// =======================
// NOTES ACTIONS
// =======================

export async function getNote() {
    const supabase = await createClient();
    // Fetch the single note row. We'll order by created_at or updated_at and just get the first one
    const { data, error } = await supabase.from('hub_notes').select('*').order('updated_at', { ascending: false }).limit(1).single();

    if (error) {
        // If no row exists or error, return fallback
        return { content: "" };
    }
    return data;
}

export async function updateNote(content: string) {
    const supabase = await createClient();

    // First try to check if a row exists
    const { data: existingData } = await supabase.from('hub_notes').select('id').limit(1).single();

    if (existingData) {
        // Update existing row
        const { error } = await supabase.from('hub_notes').update({ content, updated_at: new Date().toISOString() }).eq('id', existingData.id);
        if (error) throw new Error(error.message);
    } else {
        // Insert new single row
        const { error } = await supabase.from('hub_notes').insert({ content });
        if (error) throw new Error(error.message);
    }

    revalidatePath("/hub");
}

// =======================
// TODO / KANBAN ACTIONS
// =======================

export async function getTodos() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('hub_todos').select('*').order('position', { ascending: true }).order('created_at', { ascending: false });

    if (error) {
        console.error("Lỗi fetch todos:", error);
        return [];
    }
    return data;
}

export async function addTodo(title: string, status: string = 'todo') {
    const supabase = await createClient();
    const { error } = await supabase.from('hub_todos').insert({ title, status, position: 0 });

    if (error) {
        throw new Error(error.message);
    }
    revalidatePath("/hub");
}

export async function updateTodoStatus(id: string, status: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('hub_todos').update({ status }).eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
    revalidatePath("/hub");
}

export async function deleteTodoAction(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('hub_todos').delete().eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
    revalidatePath("/hub");
}
