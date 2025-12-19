"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have textarea, if not Use Input
import { motion } from "framer-motion";
import { FadeInSection } from "@/components/ui/fade-in-section";
// Schema for contact form
const contactSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(10, "Invalid mobile number"),
  city: z.string().min(2, "City is too short"),
});
import { submitContact } from "@/actions/contact-actions";

import { TextShimmer } from "../ui/text-shimmer";
import { toast } from "sonner";
export function Contact() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });
  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    try {
        await submitContact(data);
        toast.success("Message sent! We'll get back to you shortly.");
        form.reset();
    } catch (error) {
        console.error(error);
        toast.error("Failed to send message. Please try again.");
    }
  };


  return (
     <FadeInSection id="contact" className="py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">

        <TextShimmer
            duration={1.2}
            className='text-4xl mb-2 font-bold [--base-color:#6366F1] [--base-gradient-color:#C7D2FE] dark:[--base-color:#6366F1] dark:[--base-gradient-color:#E0E7FF]'
          >Get In Touch</TextShimmer>

            <p className="text-muted-foreground">We'd love to hear from you. Fill out the form below.</p>
        </div>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-3xl shadow-lg border border-border/50"
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                        <Input {...form.register("fullName")} placeholder="Your Name" />
                        {form.formState.errors.fullName && <p className="text-xs text-red-500">{form.formState.errors.fullName.message}</p>} 
            </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                        <Input {...form.register("email")} placeholder="your@email.com" />
                         {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
                          </div>
                           <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Mobile Number</label>
                        <Input {...form.register("mobile")} placeholder="+91 00000 00000" />
                        {form.formState.errors.mobile && <p className="text-xs text-red-500">{form.formState.errors.mobile.message}</p>}
                          </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">City</label>
                        <Input {...form.register("city")} placeholder="Your City" />
                         {form.formState.errors.city && <p className="text-xs text-red-500">{form.formState.errors.city.message}</p>}
                               </div>
                </div>
                <Button type="submit" className="w-full h-12 text-lg rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 transition-all shadow-lg shadow-primary/25">Submit</Button>
            </form>
        </motion.div>
          </div>
    </FadeInSection>
  );
}
