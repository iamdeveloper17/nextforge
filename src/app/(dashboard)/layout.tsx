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
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
          {/* Mobile: Logo pushed right of hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-10" /> {/* Spacer for hamburger */}
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>NextForge</span>
            </Link>
          </div>

          {/* Desktop: empty left side */}
          <div className="hidden md:block" />

          {/* Right: theme + user */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav user={session.user} />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}