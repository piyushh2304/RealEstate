"use server";
import connectDB from "@/lib/db";
import Client from "@/models/Client";
import { revalidatePath } from "next/cache";
export async function getClients() {
    await connectDB();
    const clients = await Client.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(clients));
}
export async function createClient(formData: FormData) {
    await connectDB();
    const name = formData.get("name") as string;
    const designation = formData.get("designation") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;

    await Client.create({ name, designation, description, imageUrl });
    revalidatePath("/admin/clients");
    revalidatePath("/"); // Update landing page too
}

export async function deleteClient(id: string) {
    await connectDB();
    await Client.findByIdAndDelete(id);
    revalidatePath("/admin/clients");
    revalidatePath("/");
}