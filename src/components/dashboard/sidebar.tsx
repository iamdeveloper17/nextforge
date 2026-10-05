"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  Sparkles,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const items = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "AI Chat", href: "/chat", icon: MessageSquare },
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Billing", href: "/billing", icon: CreditCard },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto p-4">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
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
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 border-r bg-muted/30 md:flex md:flex-col">
        <div className="flex h-16 shrink-0 items-center gap-2 border-b px-6 font-bold">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>NextForge</span>
        </div>
        <SidebarNav />
      </aside>

      {/* Mobile hamburger + sheet */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-3 left-3 z-40 h-10 w-10 rounded-lg"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
<SheetContent side="left" className="w-72 p-0">
  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

  {/* Sidebar header — shadcn ka built-in X button top-right me already hai */}
  <div className="flex h-16 items-center border-b px-4">
    <div className="flex items-center gap-2 font-bold">
      <Sparkles className="h-5 w-5 text-primary" />
      <span>NextForge</span>
    </div>
  </div>

  <SidebarNav onNavigate={() => setOpen(false)} />
</SheetContent>
        </Sheet>
      </div>
    </>
  );
}