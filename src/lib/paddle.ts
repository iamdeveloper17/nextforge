import { Paddle, Environment } from "@paddle/paddle-node-sdk";

if (!process.env.PADDLE_API_KEY) {
  throw new Error("PADDLE_API_KEY is not set in environment variables");
}

export const paddle = new Paddle(process.env.PADDLE_API_KEY, {
  environment:
    process.env.PADDLE_ENVIRONMENT === "production"
      ? Environment.production
      : Environment.sandbox,
});

export const PADDLE_PRO_PRICE_ID = process.env.PADDLE_PRO_PRICE_ID!;

if (!PADDLE_PRO_PRICE_ID) {
  throw new Error("PADDLE_PRO_PRICE_ID is not set in environment variables");
}