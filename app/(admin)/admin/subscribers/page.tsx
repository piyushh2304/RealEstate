import { getSubscribers } from "@/actions/subscriber-actions";

export default async function SubscribersPage() {
  const subscribers = await getSubscribers();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
      <div className="bg-card border rounded-xl overflow-hidden">
          <table className="w-full text-left">
              <thead className="bg-muted">
                  <tr>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Date Subscribed</th>
                  </tr>
              </thead>
              <tbody>
                  {subscribers.map((sub: any) => (
                      <tr key={sub._id} className="border-t">
                          <td className="p-4">{sub.email}</td>
                          <td className="p-4 text-muted-foreground">{new Date(sub.createdAt).toLocaleDateString()}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
          {subscribers.length === 0 && <div className="p-8 text-center text-muted-foreground">No subscribers yet.</div>}
      </div>
    </div>
  );
}