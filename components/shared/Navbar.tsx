"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { TextShimmer } from "../ui/text-shimmer";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#C7D2FE]">
          RealTrust
        </Link>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          <Link href="#home" className="hover:text-primary transition-colors">Home</Link>
          {/* <Link href="#services" className="hover:text-primary transition-colors">Services</Link> */}
          <Link href="#projects" className="hover:text-primary transition-colors">Our Projects</Link>
          <Link href="#clients" className="hover:text-primary transition-colors">Testimonials</Link>
         <Link  href="#contact">Contact Us</Link>
          <Link href="/admin/dashboard"><Button variant="default" size="sm" className="rounded-full px-6">Admin</Button></Link>
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
}