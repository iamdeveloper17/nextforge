import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out NextForge",
    features: [
      "Up to 100 AI messages/month",
      "Basic dashboard",
      "1 project",
      "Community support",
      "MIT licensed",
    ],
    cta: "Get Started",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious builders and teams",
    features: [
      "Unlimited AI messages",
      "Advanced analytics",
      "Unlimited projects",
      "Priority support",
      "Custom AI models",
      "Team collaboration",
      "API access",
    ],
    cta: "Upgrade to Pro",
    href: "/register",
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <section className="container py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-muted-foreground">
          Start free. Upgrade when you need more. Cancel anytime.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "relative",
              plan.highlighted && "border-primary shadow-lg"
            )}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                size="lg"
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        Payments coming soon via Stripe and Razorpay.
      </p>
    </section>
  );
}