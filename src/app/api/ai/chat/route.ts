import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { groqModel } from "@/lib/ai";
import { auth } from "@/lib/auth";

export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const messages: UIMessage[] = body.messages ?? [];

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("No messages provided", { status: 400 });
  }

  const result = streamText({
    model: groqModel,
    system:
      "You are NextForge AI, a helpful assistant. Be concise, accurate, and friendly.",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}