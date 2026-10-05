import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  Shield,
  Sparkles,
  Zap,
  MessageSquare,
  Star,          // 👈 Github ki jagah Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: KeyRound,
    title: "Authentication",
    description:
      "NextAuth v5 with Google OAuth. Sessions persisted in MongoDB with Prisma.",
  },
  {
    icon: MessageSquare,
    title: "AI Chat with History",
    description:
      "Production-ready chat with Groq's gpt-oss-120b. Sidebar with recent chats, auto-title, and bulk delete.",
  },
  {
    icon: CreditCard,
    title: "Payments Ready",
    description:
      "Billing page and subscription UI scaffolded. Stripe and Razorpay integration coming soon.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard & Admin",
    description:
      "User profile, settings, billing, and admin panel — all pre-built and responsive.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Server-side auth checks, rate limiting, protected API routes, and validated env vars.",
  },
  {
    icon: Zap,
    title: "Deploy in Minutes",
    description:
      "One-click deploy to Vercel. Full setup guide, .env.example, and MIT licensed.",
  },
];

const techStack = [
  { name: "Next.js 16", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "MongoDB", category: "Database" },
  { name: "Prisma", category: "ORM" },
  { name: "NextAuth v5", category: "Auth" },
  { name: "Groq AI", category: "AI" },
  { name: "shadcn/ui", category: "UI" },
  { name: "Tailwind CSS v4", category: "Styling" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="container flex flex-col items-center justify-center py-20 text-center md:py-28">
        <div className="mx-auto max-w-4xl">
          <span className="mb-6 inline-block rounded-full border px-3 py-1 text-xs font-medium">
            🚀 Open Source · MIT License
          </span>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Ship your AI SaaS in{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              days, not months
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            NextForge is a production-ready starter kit with auth, AI chat with
            history, dashboard, and payments — so you focus on your product, not
            infrastructure.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href="https://github.com/iamdeveloper17/nextforge"
                target="_blank"
              >
                <Star className="mr-2 h-4 w-4" />
                Star on GitHub
              </Link>
            </Button>
          </div>

          {/* Demo screenshot */}
          <div className="mt-16 overflow-hidden rounded-xl border bg-muted/30 shadow-2xl">
            <Image
              src="/screenshots/landing.png"
              alt="NextForge Dashboard Preview"
              width={1200}
              height={700}
              className="w-full"
              priority
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t bg-muted/30">
        <div className="container py-20">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to ship
            </h2>
            <p className="text-lg text-muted-foreground">
              Stop rebuilding the same infrastructure. Start with a foundation
              that already works.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="border-t">
        <div className="container py-16">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Built with the modern stack
          </p>
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="rounded-full border bg-background px-4 py-2 text-sm font-medium"
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="container py-20">
          <div className="mx-auto max-w-2xl rounded-2xl border bg-gradient-to-br from-primary/5 to-primary/10 p-10 text-center md:p-14">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Ready to build?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Clone, customize, deploy. Your AI SaaS is 3 commands away.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Start Building Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="https://github.com/iamdeveloper17/nextforge"
                  target="_blank"
                >
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}