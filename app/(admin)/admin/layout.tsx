import { Sidebar } from "@/components/admin/Sidebar";
import { ModeToggle } from "@/components/mode-toggle";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="flex justify-end mb-4 md:hidden">
            {/* Mobile Header often goes here */}
            <ModeToggle />
        </div>
         <div className="hidden md:flex justify-end mb-4">
             <ModeToggle />
         </div>
        {children}
      </main>
    </div>
  );
}