"use server";
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";
export async function submitContact(data: any) {
  await connectDB();
  await Contact.create(data);
  return { success: true };
}
export async function getContacts() {
  await connectDB();
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(contacts));
}