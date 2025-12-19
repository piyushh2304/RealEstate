import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Projects } from "@/components/landing/Projects";
import { Clients } from "@/components/landing/Clients";
import { Contact } from "@/components/landing/Contact";

import { Newsletter } from "@/components/landing/Newsletter";
import { FooterSection } from "@/components/landing/FooterSection";

export default function Home() {

  return (
   <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
       <div className="relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <Projects />
        <Clients />
        <Contact />
        <Newsletter />
        <FooterSection />
      </div>
    </main>
  );
}
