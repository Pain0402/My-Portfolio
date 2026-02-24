"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
    const supabase = await createClient();

    // Lấy thông tin từ form
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const year = formData.get("year") as string;
    const description = formData.get("description") as string;
    const techStackRaw = formData.get("tech_stack") as string; // dạng chuỗi cách nhau bởi dấu phẩy
    const tech_stack = techStackRaw ? techStackRaw.split(",").map((s) => s.trim()) : [];

    // Các trường optional (có thể trống)
    const logo_url = formData.get("logo_url") as string || null;
    const cover_image_url = formData.get("cover_image_url") as string || null;
    const repo_url = formData.get("repo_url") as string || null;
    const demo_url = formData.get("demo_url") as string || null;
    const overview = formData.get("overview") as string || null;
    const problem_statement = formData.get("problem_statement") as string || null;
    const architecture = formData.get("architecture") as string || null;
    const learnings = formData.get("learnings") as string || null;
    const background_gradient = formData.get("background_gradient") as string || null;

    const { error } = await supabase.from("projects").insert({
        title,
        slug,
        category,
        year,
        description,
        tech_stack,
        logo_url,
        cover_image_url,
        repo_url,
        demo_url,
        overview,
        problem_statement,
        architecture,
        learnings,
        background_gradient,
    });

    if (error) {
        console.error("Lỗi tạo Project:", error.message);
        throw new Error(error.message);
    }

    revalidatePath("/admin/projects");
    revalidatePath("/"); // Làm mới trang chủ
    redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const year = formData.get("year") as string;
    const description = formData.get("description") as string;
    const techStackRaw = formData.get("tech_stack") as string;
    const tech_stack = techStackRaw ? techStackRaw.split(",").map((s) => s.trim()) : [];

    const logo_url = formData.get("logo_url") as string || null;
    const cover_image_url = formData.get("cover_image_url") as string || null;
    const repo_url = formData.get("repo_url") as string || null;
    const demo_url = formData.get("demo_url") as string || null;
    const overview = formData.get("overview") as string || null;
    const problem_statement = formData.get("problem_statement") as string || null;
    const architecture = formData.get("architecture") as string || null;
    const learnings = formData.get("learnings") as string || null;
    const background_gradient = formData.get("background_gradient") as string || null;

    const { error } = await supabase.from("projects").update({
        title,
        slug,
        category,
        year,
        description,
        tech_stack,
        logo_url,
        cover_image_url,
        repo_url,
        demo_url,
        overview,
        problem_statement,
        architecture,
        learnings,
        background_gradient,
    }).eq("id", id);

    if (error) {
        console.error("Lỗi cập nhật Project:", error.message);
        throw new Error(error.message);
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    redirect("/admin/projects");
}

export async function deleteProject(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
        console.error("Lỗi xóa Project:", error.message);
        throw new Error(error.message);
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
}

// Upload file lên Supabase Storage
export async function uploadMedia(formData: FormData) {
    const supabase = await createClient();
    const file = formData.get("file") as File;

    if (!file) {
        throw new Error("Không có file nào được chọn.");
    }

    // Đổi tên file để tránh trùng lặp
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        throw new Error(`Upload lỗi: ${error.message}`);
    }

    // Lấy link public
    const { data: { publicUrl } } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

    return publicUrl;
}
