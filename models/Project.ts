import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
    title: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
}


const ProjectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true })



const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
export default Project;