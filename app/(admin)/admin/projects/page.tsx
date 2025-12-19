import { getProjects } from "@/actions/project-actions";

import { ProjectForm } from "@/components/admin/ProjectForm";

import { ProjectItem } from "@/components/admin/ProjectItem";
import { TextShimmer } from "@/components/ui/text-shimmer";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      <div className="flex justify-center w-full">
        <ProjectForm />
      </div>

      <div>
        <div className="flex justify-center w-full mt-8 mb-6">
          <TextShimmer
            duration={1.2}
            className="text-4xl font-bold [--base-color:#6366F1] [--base-gradient-color:#C7D2FE] dark:[--base-color:#6366F1] dark:[--base-gradient-color:#E0E7FF]"
          >
            {`Existing Projects (${projects.length})`}
          </TextShimmer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <div key={project._id} className="h-full">
              <ProjectItem project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}