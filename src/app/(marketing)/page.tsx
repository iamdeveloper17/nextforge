import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: KeyRound,
    title: "Authentication",
    description:
      "NextAuth v5 with Google, GitHub, and email. Sessions persisted in MongoDB.",
  },
  {
    icon: Bot,
    title: "AI Streaming",
    description:
      "Production-ready chat with Groq's gpt-oss-120b. Add any model in seconds.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description:
      "Stripe + Razorpay ready. Subscriptions, one-time payments, webhooks.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description:
      "User profile, settings, billing, and admin panel — all pre-built.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Rate limiting, CSRF protection, and validated env vars out of the box.",
  },
  {
    icon: Zap,
    title: "Deploy in Minutes",
    description:
      "One-click deploy to Vercel. Railway, AWS, and Docker guides included.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
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
                ⭐ Star on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t bg-muted/30">
        <div className="container py-24">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to ship
            </h2>
            <p className="text-lg text-muted-foreground">
              Stop rebuilding the same infrastructure. Start with a foundation
              that already works.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-lg border bg-background p-6 transition-colors hover:border-primary/50"
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

      {/* CTA */}
      <section className="border-t">
        <div className="container py-24">
          <div className="mx-auto max-w-2xl rounded-2xl border bg-gradient-to-br from-primary/5 to-primary/10 p-12 text-center">
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