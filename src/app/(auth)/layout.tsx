import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>NextForge</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="container flex flex-1 items-center justify-center py-12">
        {children}
      </main>
    </div>
  );
}