"use server";
import connectDB from "@/lib/db";
import Project from "@/models/Project";
import { revalidatePath } from "next/cache";
const serialize = (obj: any) => JSON.parse(JSON.stringify(obj));
export async function getProjects() {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return serialize(projects);
}
export async function createProject(formData: FormData) {
    await connectDB();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    await Project.create({ title, description, imageUrl });
    revalidatePath("/");
    revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
    await connectDB();
    await Project.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/projects");
}