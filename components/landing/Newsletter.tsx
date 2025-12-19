"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/actions/subscriber-actions";
import { useRef } from "react";
import { FadeInSection } from "@/components/ui/fade-in-section";


export function Newsletter() {
  const formRef = useRef<HTMLFormElement>(null);
  
   return (
    <FadeInSection className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
         <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Subscribe to our Newsletter</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Stay updated with the latest trends in real estate design and market insights.
          No spam, we promise.
        </p>
             <form 
            ref={formRef}
            className="max-w-md mx-auto flex gap-2" 
            action={async (formData) => {
              const result = await subscribeToNewsletter(formData);
              if (result.success) {
                toast.success("Subscribed successfully!");
                formRef.current?.reset();
              } else {
                toast.error(result.error || "Subscription failed");
              }
            }}
        >
            <Input name="email" type="email" placeholder="Enter your email" required className="h-12 bg-background" />
            <Button type="submit" size="lg" className="h-12 px-8">Subscribe</Button>
        </form>
          </div>
    </FadeInSection>
  );
}