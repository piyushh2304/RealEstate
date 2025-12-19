import { getProjects } from "@/actions/project-actions";
import { getClients } from "@/actions/client-actions";
import { getContacts } from "@/actions/contact-actions";
import { getSubscribers } from "@/actions/subscriber-actions";
import { TextShimmer } from "@/components/ui/text-shimmer";

export default async function Dashboard() {
  const projects = await getProjects();
  const clients = await getClients();
  const contacts = await getContacts();
  const subscribers = await getSubscribers();

  return (
    <div className="space-y-6">
      <TextShimmer
                 duration={1.2}
                 className='text-4xl font-bold [--base-color:#6366F1] [--base-gradient-color:#C7D2FE] dark:[--base-color:#6366F1] dark:[--base-gradient-color:#E0E7FF]'
               >Dashboard</TextShimmer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-card rounded-xl border shadow-sm">
            <h3 className="text-muted-foreground">Total Projects</h3>
            <p className="text-4xl font-bold mt-2">{projects.length}</p>
        </div>
        <div className="p-6 bg-card rounded-xl border shadow-sm">
            <h3 className="text-muted-foreground">Happy Clients</h3>
            <p className="text-4xl font-bold mt-2">{clients.length}</p>
        </div>
        <div className="p-6 bg-card rounded-xl border shadow-sm">
            <h3 className="text-muted-foreground">Messages</h3>
            <p className="text-4xl font-bold mt-2">{contacts.length}</p>
        </div>
        <div className="p-6 bg-card rounded-xl border shadow-sm">
            <h3 className="text-muted-foreground">Subscribers</h3>
            <p className="text-4xl font-bold mt-2">{subscribers.length}</p>
        </div>
      </div>
    </div>
  );
}