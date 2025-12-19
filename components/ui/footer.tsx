import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface FooterProps {
  logo: React.ReactNode
  brandName: string
  socialLinks: Array<{
    icon: React.ReactNode
    href: string
    label: string
  }>
  mainLinks: Array<{
    href: string
    label: string
  }>
  legalLinks: Array<{
    href: string
    label: string
  }>
  copyright: {
    text: string
    license?: string
  }
}

export function Footer({
  logo,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="pb-12 pt-24 border-t border-white/5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <a href="/" className="flex items-center gap-x-3 group">
              <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary transition-colors duration-300 group-hover:text-white">
                {logo}
              </div>
              <span className="font-bold text-2xl text-foreground tracking-tight">{brandName}</span>
            </a>
            <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
              Crafting premium real estate experiences through innovative design and expert consultation since 2015.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-2xl border-white/10 hover:bg-primary hover:text-white transition-all duration-300"
                  asChild
                >
                  <a href={link.href} target="_blank" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground mb-6">Navigation</h4>
            <ul className="space-y-4">
              {mainLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-lg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground mb-6">Connect</h4>
            <ul className="space-y-4">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-lg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-muted-foreground">
            {copyright.text}. {copyright.license}
          </div>
          <div className="flex gap-8 text-sm font-medium text-muted-foreground italic">
            <span>Made with ✨ by Team RealTrust</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

