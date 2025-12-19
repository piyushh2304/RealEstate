"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(10),
  city: z.string().min(2),
});

import { submitContact } from "@/actions/contact-actions";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export function Hero() {
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await submitContact(data);
      alert("Consultation Requested! We will contact you soon.");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <BackgroundBeamsWithCollision className="relative bg-gradient-to-br from-background via-background to-primary/5">
      <section id="home" className="relative flex items-center justify-center overflow-visible w-full">
        <div className="container px-6 md:px-12 lg:px-24 grid lg:grid-cols-2 gap-16 items-center relative z-10 py-20">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
            <motion.h1 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="block text-5xl md:text-6xl lg:text-7xl tracking-tight">
                Consultation,
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl tracking-tight mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent py-2">
                Design,
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl tracking-tight mt-2">
                & Marketing
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Get the best advice for your real estate journey. We help you every step of the way with expert consultation and innovative solutions.
            </motion.p>

            {/* Floating Stats */}
            <motion.div 
              className="flex gap-8 justify-center lg:justify-start flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {[
                { label: "Projects", value: "500+" },
                { label: "Clients", value: "1000+" },
                { label: "Success Rate", value: "98%" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl md:text-4xl text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Form Card with 3D Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
            className="relative max-w-lg mx-auto w-full"
          >
            {/* 3D Card Container */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
              
              {/* Main Card */}
              <motion.div 
                className="relative bg-card/95 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-300"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "perspective(1000px) rotateX(2deg) rotateY(-2deg)",
                }}
                whileHover={{
                  transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                }}
              >
                {/* Card Header */}
                <div className="mb-8 space-y-2">
                  <motion.h3 
                    className="text-2xl md:text-3xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    Get a Free Consultation
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    Fill out the form and we&apos;ll get back to you within 24 hours.
                  </motion.p>
                </div>

                {/* Form */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {[
                    { name: "fullName", placeholder: "Full Name", delay: 0.7 },
                    { name: "email", placeholder: "Email Address", delay: 0.8 },
                    { name: "mobile", placeholder: "Mobile Number", delay: 0.9 },
                    { name: "city", placeholder: "City", delay: 1.0 },
                  ].map((field) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: field.delay, duration: 0.5 }}
                    >
                      <Input 
                        {...form.register(field.name as "fullName" | "email" | "mobile" | "city")} 
                        placeholder={field.placeholder} 
                        className="bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300 h-12 rounded-xl"
                      />
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Get Quote Now
                    </Button>
                  </motion.div>
                </form>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </BackgroundBeamsWithCollision>
  );
}
