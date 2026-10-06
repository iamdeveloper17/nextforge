import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { paddle, PADDLE_PRO_PRICE_ID } from "@/lib/paddle";

export async function POST() {
    try {
        const session = await auth();
        if (!session?.user?.id || !session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await db.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Create or reuse Paddle customer
        let customerId = user.paddleCustomerId;

        if (!customerId) {
            const customer = await paddle.customers.create({
                email: user.email!,
                name: user.name ?? undefined,
                customData: { userId: user.id },
            });
            customerId = customer.id;

            await db.user.update({
                where: { id: user.id },
                data: { paddleCustomerId: customerId },
            });
        }

        // Create checkout session
        const appUrl =
            process.env.NEXT_PUBLIC_APP_URL ||
            process.env.NEXTAUTH_URL ||
            "http://localhost:3000";
        const transaction = await paddle.transactions.create({
            items: [
                {
                    priceId: PADDLE_PRO_PRICE_ID,
                    quantity: 1,
                },
            ],
            customerId,
            customData: { userId: user.id },
            // Note: checkout.url omitted — Paddle uses Default Payment Link
        });

        return NextResponse.json({
            transactionId: transaction.id,
            checkoutUrl: transaction.checkout?.url,
        });
    } catch (error) {
        console.error("Paddle checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout" },
            { status: 500 }
        );
    }
}