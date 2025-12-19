import { getContacts } from "@/actions/contact-actions";
import { Card, CardContent } from "@/components/ui/card";
export default async function ContactsPage() {
  const contacts = await getContacts();
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Contact Messages</h1>
      <div className="grid gap-4">
        {contacts.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}
        {contacts.map((contact: any) => (
           <Card key={contact._id}>
               <CardContent className="p-6">
                   <div className="flex justify-between items-start">
                       <div>
                           <h4 className="font-bold text-lg">{contact.fullName}</h4>
                           <p className="text-sm text-muted-foreground">{contact.email} • {contact.mobile}</p>
                           <p className="mt-2 text-sm text-primary font-medium">{contact.city}</p>
                       </div>
                       <span className="text-xs text-muted-foreground">
                           {new Date(contact.createdAt).toLocaleDateString()}
                       </span>
                   </div>
               </CardContent>
           </Card>
        ))}
      </div>
    </div>
  );
}