"use client";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, Users, Mail, UserPlus, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
  { label: "Subscribers", href: "/admin/subscribers", icon: UserPlus },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border p-6 hidden md:block h-full">
        <h2 className="text-2xl font-bold mb-8 text-primary">AdminPanel</h2>
        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                pathname === item.href 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
          <div className="mt-8 border-t pt-4">
              <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium hover:bg-muted text-muted-foreground hover:text-foreground">
                  <ArrowLeft size={20} />
                  Back to Home
              </Link>
          </div>
        </nav>
    </aside>
  );
}