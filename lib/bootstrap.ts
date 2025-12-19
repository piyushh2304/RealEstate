import connectDB from "./db";
import Client from "@/models/Client";
import Project from "@/models/Project";
import { SEED_CLIENTS, SEED_PROJECTS } from "./seed-data";

export async function bootstrap() {
    if (process.env.NEXT_RUNTIME === 'edge') {
        return;
    }

    try {
        await connectDB();
        console.log("Bootstrapping: Checking default data...");

        // Seed Clients
        for (const client of SEED_CLIENTS) {
            const exists = await Client.findById(client._id);
            if (!exists) {
                console.log(`Seeding client: ${client.name}`);
                await Client.create(client);
            }
        }

        // Seed Projects
        for (const project of SEED_PROJECTS) {
            const exists = await Project.findById(project._id);
            if (!exists) {
                console.log(`Seeding project: ${project.title}`);
                await Project.create(project);
            }
        }

        console.log("Bootstrapping: Complete.");
    } catch (error) {
        console.error("Bootstrapping failed:", error);
    }
}
