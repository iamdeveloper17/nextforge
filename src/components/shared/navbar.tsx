"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/theme-toggle";

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold"
          onClick={() => setOpen(false)}
        >
          <Sparkles className="h-5 w-5 text-primary" />
          <span>NextForge</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Desktop buttons */}
          <div className="hidden items-center gap-2 sm:flex">
            {user ? (
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu — Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex h-16 items-center border-b px-6">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold"
                onClick={() => setOpen(false)}
              >
                <Sparkles className="h-5 w-5 text-primary" />
                <span>NextForge</span>
              </Link>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA section */}
            <div className="mt-auto border-t p-4">
              {user ? (
                <Button asChild className="w-full" size="lg">
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/register" onClick={() => setOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}