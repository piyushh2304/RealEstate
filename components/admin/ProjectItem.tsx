"use client";

import { useState } from "react";
import { deleteProject } from "@/actions/project-actions";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectItemProps {
  project: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
  };
}

export function ProjectItem({ project }: ProjectItemProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    setDeleting(true);
    try {
      await deleteProject(project._id);
    } catch (error) {
      console.error(error);
      alert("Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-500 h-full flex flex-col border-border/50 bg-gradient-to-br from-card/50 via-card to-card/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:scale-[1.02]">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating sparkle icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <div className="rounded-full bg-background/90 backdrop-blur-sm p-2 shadow-lg border border-border/50">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <CardHeader className="relative space-y-2 pb-3">
        <CardTitle className="line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors duration-300">
          {project.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative flex-grow pb-4">
        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
          {project.description}
        </p>
      </CardContent>

      <CardFooter className="relative mt-auto pt-4 border-t border-border/30">
        <Button 
            variant="ghost" 
            size="sm" 
            className="w-full group/btn h-11 rounded-xl bg-gradient-to-r from-muted/30 to-muted/50 hover:from-destructive/10 hover:to-destructive/5 border border-border/30 hover:border-destructive/30 transition-all duration-300 hover:shadow-lg"
            onClick={handleDelete}
            disabled={deleting}
        >
            {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            ) : (
                <>
                    <Trash2 className="w-4 h-4 mr-2 [--base-color:#6366F1] [--base-gradient-color:#C7D2FE] dark:[--base-color:#6366F1] dark:[--base-gradient-color:#E0E7FF] duration-200" /> 
                    <span className="text-muted-foreground [--base-color:#6366F1] [--base-gradient-color:#C7D2FE] dark:[--base-color:#6366F1] dark:[--base-gradient-color:#E0E7FF] duration-200">Delete Project</span>
                </>
            )}
        </Button>
      </CardFooter>
    </Card>
  );
}