import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
}

// Global cache (prevents multiple connections in dev)
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    cached.conn = await mongoose.connect(MONGODB_URI);
    return cached.conn;
}

export default connectDB;
