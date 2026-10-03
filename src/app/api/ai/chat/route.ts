import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { groqModel } from "@/lib/ai";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const messages: UIMessage[] = body.messages ?? [];
  let chatId: string | undefined = body.chatId;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("No messages provided", { status: 400 });
  }

  // Get last user message TEXT
  const lastUserMessage = messages[messages.length - 1];
  const lastUserText =
    lastUserMessage?.role === "user"
      ? lastUserMessage.parts
          .filter((p) => p.type === "text")
          .map((p) => (p as { type: "text"; text: string }).text)
          .join(" ")
          .trim()
      : "";

  // Reject empty message
  if (!lastUserText) {
    return new Response("Empty message", { status: 400 });
  }

  // Create chat if it doesn't exist
  if (!chatId) {
    const firstUserMessage = messages.find((m) => m.role === "user");
    const firstText =
      firstUserMessage?.parts
        .filter((p) => p.type === "text")
        .map((p) => (p as { type: "text"; text: string }).text)
        .join(" ")
        .trim() ?? "New Chat";

    const title =
      firstText.length > 50 ? firstText.slice(0, 50) + "..." : firstText;

    const newChat = await db.chat.create({
      data: {
        userId: session.user.id,
        title,
      },
    });
    chatId = newChat.id;
  } else {
    const chat = await db.chat.findFirst({
      where: { id: chatId, userId: session.user.id },
    });
    if (!chat) {
      return new Response("Chat not found", { status: 404 });
    }
  }

  // Save user message (with content check)
  await db.message.create({
    data: {
      chatId,
      role: "user",
      content: lastUserText,
    },
  });

  const activeChatId = chatId;

  const result = streamText({
    model: groqModel,
    system:
      "You are NextForge AI, a helpful assistant. Be concise, accurate, and friendly.",
    messages: await convertToModelMessages(messages),
    onFinish: async ({ text }) => {
      if (text?.trim()) {
        await db.message.create({
          data: {
            chatId: activeChatId,
            role: "assistant",
            content: text,
          },
        });
      }
      await db.chat.update({
        where: { id: activeChatId },
        data: { updatedAt: new Date() },
      });
    },
  });

return result.toUIMessageStreamResponse({
  headers: {
    "X-Chat-Id": activeChatId ?? "",
  },
});
}