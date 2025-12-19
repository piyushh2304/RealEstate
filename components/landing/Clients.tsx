import { getClients } from "@/actions/client-actions";
import { ClientsList } from "./ClientsList";
import { TextShimmer } from "@/components/ui/text-shimmer";

import { FadeInSection } from "@/components/ui/fade-in-section";

export async function Clients() {
  const clients = await getClients();

  return (
   <FadeInSection id="clients" className="py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-center w-full mb-20">
        <div className="flex justify-center w-full mb-10">
           <TextShimmer
            duration={1.2}
            className='text-4xl font-bold [--base-color:#6366F1] [--base-gradient-color:#C7D2FE] dark:[--base-color:#6366F1] dark:[--base-gradient-color:#E0E7FF]'
          >Happy Clients</TextShimmer>
            </div>
        </div>
        
        {clients.length === 0 ? (
            <p className="text-center text-muted-foreground">No clients found. Add some from the Admin Panel.</p>
        ) : (
            <ClientsList clients={clients} />
        )}
      </div>
    </FadeInSection>
  );
}

