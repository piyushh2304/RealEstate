import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
    fullName: string;
    email: string;
    mobile: string;
    city: string;
    createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        city: { type: String, required: true },
    },
    { timestamps: true }
);

const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
export default Contact;
