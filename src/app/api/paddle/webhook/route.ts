import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { paddle } from "@/lib/paddle";

export async function POST(req: Request) {
    const signature = req.headers.get("paddle-signature") || "";
    const rawBody = await req.text();

    if (!signature || !process.env.PADDLE_WEBHOOK_SECRET) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    try {
        const eventData = await paddle.webhooks.unmarshal(
            rawBody,
            process.env.PADDLE_WEBHOOK_SECRET,
            signature
        );

        if (!eventData) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        const eventType = eventData.eventType;
        const data = eventData.data as unknown as Record<string, unknown>;

        console.log("Paddle webhook:", eventType);

        switch (eventType) {
            case "subscription.created":
            case "subscription.updated": {
                const subscriptionId = data.id as string;
                const customerId = data.customerId as string;
                const status = data.status as string;
                const items = data.items as Array<{ price: { id: string } }>;
                const currentBillingPeriod = data.currentBillingPeriod as {
                    endsAt: string;
                };

                const user = await db.user.findFirst({
                    where: { paddleCustomerId: customerId },
                });

                if (user) {
                    await db.user.update({
                        where: { id: user.id },
                        data: {
                            paddleSubscriptionId: subscriptionId,
                            paddlePriceId: items?.[0]?.price?.id,
                            paddleCurrentPeriodEnd: currentBillingPeriod?.endsAt
                                ? new Date(currentBillingPeriod.endsAt)
                                : null,
                            subscriptionStatus:
                                status === "active" || status === "trialing"
                                    ? "active"
                                    : status,
                        },
                    });
                }
                break;
            }

            case "subscription.canceled": {
                const subscriptionId = data.id as string;

                await db.user.updateMany({
                    where: { paddleSubscriptionId: subscriptionId },
                    data: {
                        subscriptionStatus: "canceled",
                    },
                });
                break;
            }

case "transaction.created":
case "transaction.completed":
case "transaction.updated": {
  console.log("Transaction event:", eventType, "ID:", data.id);
  const customerId = data.customerId as string | undefined;
  const subscriptionId = data.subscriptionId as string | undefined;

  if (customerId) {
    const user = await db.user.findFirst({
      where: { paddleCustomerId: customerId },
    });

    if (user) {
      const updateData: Record<string, unknown> = {
        subscriptionStatus: "active",
      };
      
      if (subscriptionId) {
        updateData.paddleSubscriptionId = subscriptionId;
      }

      await db.user.update({
        where: { id: user.id },
        data: updateData,
      });
      console.log("✅ User subscription updated via transaction event:", user.email);
    } else {
      console.log("⚠️ No user found with paddleCustomerId:", customerId);
    }
  } else {
    console.log("⚠️ No customerId in transaction event");
  }
  break;
}

            default:
                console.log("Unhandled event:", eventType);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}