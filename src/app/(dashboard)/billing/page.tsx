import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and payment methods.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>Free</strong> plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">$0</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Up to 100 AI messages/month
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Basic dashboard
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              1 project
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upgrade to Pro</CardTitle>
          <CardDescription>
            Unlock unlimited AI messages and advanced features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold">$19</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <Button disabled>Upgrade to Pro (Coming Soon)</Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Stripe and Razorpay integration coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}