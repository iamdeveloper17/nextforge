"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "AI Chat", href: "/chat", icon: MessageSquare },
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Billing", href: "/billing", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r bg-muted/30 md:flex md:flex-col">
      <div className="flex h-16 shrink-0 items-center gap-2 border-b px-6 font-bold">
        <Sparkles className="h-5 w-5 text-primary" />
        <span>NextForge</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}