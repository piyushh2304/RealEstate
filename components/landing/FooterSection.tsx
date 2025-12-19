import { Hexagon, Github, Twitter, Linkedin } from "lucide-react";
import { Footer } from "@/components/ui/footer";

export function FooterSection() {
  return (
    <div className="w-full bg-background/50 backdrop-blur-sm mt-auto border-t border-border/50">
      <div className="container mx-auto">
        <Footer
          logo={<Hexagon className="h-8 w-8 text-primary" />}
          brandName="RealTrust"
          socialLinks={[
            {
              icon: <Twitter className="h-5 w-5" />,
              href: "https://twitter.com",
              label: "Twitter",
            },
            {
              icon: <Github className="h-5 w-5" />,
              href: "https://github.com",
              label: "GitHub",
            },
            {
              icon: <Linkedin className="h-5 w-5" />,
              href: "https://linkedin.com",
              label: "LinkedIn",
            },
          ]}
          mainLinks={[
            { href: "#home", label: "Home" },
            { href: "#projects", label: "Projects" },
            { href: "#clients", label: "Clients" },
            { href: "#contact", label: "Contact" },
          ]}
          legalLinks={[
            { href: "#", label: "Privacy" },
            { href: "#", label: "Terms" },
          ]}
          copyright={{
            text: "© 2025 RealTrust",
            license: "All rights reserved",
          }}
        />
      </div>
    </div>
  );
}
