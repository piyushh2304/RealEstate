"use client";
import { useRef, useState } from "react";
import { createClient } from "@/actions/client-actions";
import { uploadImage } from "@/actions/upload-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminImageUpload } from "./AdminImageUpload";
import { Loader2, Sparkles, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // Assuming sonner is installed, or we can use basic alert for now if not.

// Toast handled by sonner import above

export function ClientForm() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadKey, setUploadKey] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            let imageUrl = "";
            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append("file", imageFile);
                const result = await uploadImage(uploadFormData);
                imageUrl = result.secure_url;
            }

            // Append image URL to the form data properly
            // We need to call the server action with the fields
            // Since we can't easily modify the FormData object passed to action from form directly in a clean way without JS
            // We will reconstruct the payload
            
            const payload = new FormData();
            payload.append("name", formData.get("name") as string);
            payload.append("designation", formData.get("designation") as string);
            payload.append("description", formData.get("description") as string);
            payload.append("imageUrl", imageUrl); // Use the uploaded URL

            await createClient(payload);
            toast.success("Client added successfully!");
            formRef.current?.reset();
            setUploadKey(prev => prev + 1);
        } catch (error) {
            console.error(error);
            toast.error("Failed to add client.");
        } finally {
            setLoading(false);
            setImageFile(null);
            // Optional: reset form
        }
    };

    return (
        <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="mb-8 space-y-3">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
                        <Sparkles className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="text-2xl">Add New Client</h2>
                        <p className="text-sm text-muted-foreground">Add a satisfied client testimonial</p>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <form ref={formRef} action={handleSubmit} className="space-y-6 rounded-3xl border border-border/50 bg-gradient-to-br from-card/50 via-card to-card/50 p-8 shadow-2xl backdrop-blur-sm">
                {/* Client Name */}
                <div className="space-y-2">
                    <label className="text-sm text-muted-foreground px-1">
                        Client Name
                    </label>
                    <div className="relative group">
                        <Input 
                            name="name" 
                            placeholder="Client Name" 
                            required 
                            className="h-12 px-4 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-200 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5"
                        />
                    </div>
                </div>

                {/* Designation */}
                <div className="space-y-2">
                    <label className="text-sm text-muted-foreground px-1">
                        Designation
                    </label>
                    <div className="relative group">
                        <Input 
                            name="designation" 
                            placeholder="Designation (e.g. CEO)" 
                            required 
                            className="h-12 px-4 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-200 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm text-muted-foreground px-1">
                        Feedback / Description
                    </label>
                    <div className="relative group">
                        <Textarea 
                            name="description" 
                            placeholder="Feedback/Description" 
                            required 
                            className="min-h-[120px] px-4 py-3 rounded-xl border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-200 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 resize-none"
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <AdminImageUpload key={uploadKey} onImageSelected={setImageFile} label="Client Photo" />

                {/* Submit Button */}
                <div className="pt-4">
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Adding Client...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Add Client
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
