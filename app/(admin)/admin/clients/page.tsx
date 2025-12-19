import { getClients } from "@/actions/client-actions";
import { ClientForm } from "@/components/admin/ClientForm";
import { ClientItem } from "@/components/admin/ClientItem";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="space-y-8">
      
      <div className="flex justify-center w-full">
        <ClientForm />
      </div>

      <div>
        <h2 className="text-xl font-bold mt-8 mb-6">Happy Clients ({clients.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client: any) => (
            <div key={client._id} className="h-full">
              <ClientItem client={client} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}