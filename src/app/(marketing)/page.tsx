import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="container flex flex-col items-center justify-center py-24 text-center md:py-32">
      <div className="mx-auto max-w-3xl">
        <span className="mb-6 inline-block rounded-full border px-3 py-1 text-xs font-medium">
          🚀 Open Source · MIT License
        </span>

        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Ship your AI SaaS in{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            days, not months
          </span>
        </h1>

        <p className="mb-8 text-lg text-muted-foreground">
          NextForge is a production-ready starter kit with auth, payments, AI
          streaming, and a dashboard — so you focus on your product, not
          infrastructure.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="/register">Get Started Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link
              href="https://github.com/iamdeveloper17/nextforge"
              target="_blank"
            >
              ⭐ Star on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}