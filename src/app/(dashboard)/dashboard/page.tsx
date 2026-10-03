import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome, {session.user?.name || session.user?.email}!
      </p>
      <pre className="mt-4 rounded-lg bg-muted p-4 text-sm">
        {JSON.stringify(session, null, 2)}
      </pre>
    </main>
  );
}