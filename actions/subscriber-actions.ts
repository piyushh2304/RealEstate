"use server";
import connectDB from "@/lib/db";
import Subscriber from "@/models/Subscriber";

export async function subscribeToNewsletter(formData: FormData) {
    await connectDB();
    const email = formData.get("email");

    if (!email || typeof email !== "string") {
        return { success: false, error: "Email is required and must be a string." };
    }

    try {
        await Subscriber.create({ email });
        return { success: true };
    } catch (error) {
        return { success: false, error: "Email already subscribed or invalid." };
    }
}

export async function getSubscribers() {
    await connectDB();
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(subscribers));
}
