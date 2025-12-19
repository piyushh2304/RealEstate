import mongoose, { Schema, Document, Model } from "mongoose";


export interface IClient extends Document {
    name: string;
    designation: string;
    description: string;
    imageUrl: string;
}


const ClientSchema = new Schema<IClient>(
    {
        name: { type: String, required: true },
        designation: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
    },
    { timestamps: true }
)


const Client: Model<IClient> = mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema)
export default Client;
