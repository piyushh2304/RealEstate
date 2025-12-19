"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface Client {
  _id: string;
  name: string;
  designation: string;
  description: string;
  imageUrl: string;
}

interface ClientsListProps {
  clients: Client[];
}

export function ClientsList({ clients }: ClientsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {clients.map((client, index) => (
        <motion.div
          key={client._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="group transition-all duration-300 h-full flex flex-col bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10">
            <CardContent className="pt-6 flex-grow">
              <div className="relative">
                {/* Quote icon decoration */}
                <div className="absolute -top-2 -left-2 text-4xl text-primary/10 font-serif">"</div>
                <p className="text-muted-foreground leading-relaxed relative z-10 italic">
                  {client.description}
                </p>
              </div>
            </CardContent>
            
            <CardHeader className="pt-0 pb-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/10 group-hover:border-primary/50 transition-colors">
                  <AvatarImage src={client.imageUrl} />
                  <AvatarFallback>{client.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{client.name}</h4>
                  <p className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors">{client.designation}</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
