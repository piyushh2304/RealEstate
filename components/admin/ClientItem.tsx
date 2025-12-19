"use client";

import { useState } from "react";
import { deleteClient } from "@/actions/client-actions";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface ClientItemProps {
  client: {
    _id: string;
    name: string;
    designation: string;
    description: string;
    imageUrl: string;
  };
}

export function ClientItem({ client }: ClientItemProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    
    setDeleting(true);
    try {
      await deleteClient(client._id);
      toast.success("Client deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete client");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 h-full flex flex-col bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 border-border/50">
        
      <CardContent className="pt-8 flex-grow">
        <div className="relative">
            {/* Quote icon decoration */}
            <div className="absolute -top-4 -left-2 text-6xl text-primary/10 font-serif leading-none select-none">"</div>
            <p className="text-muted-foreground leading-relaxed relative z-10 italic pl-4">
                {client.description}
            </p>
        </div>
      </CardContent>
            
      <CardHeader className="pt-0 pb-6">
        <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-primary/10 group-hover:border-primary/50 transition-colors">
                <AvatarImage src={client.imageUrl} className="object-cover" />
                <AvatarFallback>{client.name[0]}</AvatarFallback>
            </Avatar>
            <div>
                <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{client.name}</h4>
                <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">{client.designation}</p>
            </div>
        </div>
      </CardHeader>

      <CardFooter className="mt-auto pt-4 border-t border-border/50">
        <div className="w-full rounded-md p-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent group-hover:via-primary transition-all duration-300">
            <Button 
                variant="ghost" 
                size="sm" 
                className="w-full group/btn bg-background/50 hover:bg-background transition-all hover:text-destructive"
                onClick={handleDelete}
                disabled={deleting}
            >
                {deleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <>
                        <Trash2 className="w-4 h-4 mr-2 group-hover/btn:text-destructive transition-colors" /> 
                        <span className="group-hover/btn:text-destructive transition-colors opacity-90">Delete Client</span>
                    </>
                )}
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
