import Link from "next/link";
import { Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserNav } from "@/components/shared/user-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-6 backdrop-blur">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold md:hidden"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span>NextForge</span>
          </Link>
          <div className="hidden md:block" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav user={session.user} />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}