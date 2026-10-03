import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Chat } from "@/components/ai/chat";

export default async function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) notFound();

  const { id } = await params;

  const chat = await db.chat.findFirst({
    where: { id, userId: session.user.id },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!chat) notFound();

  const initialMessages = chat.messages.map((m) => ({
    id: m.id,
    role: m.role as "user" | "assistant",
    parts: [{ type: "text" as const, text: m.content }],
  }));

  return (
    <Chat
      key={chat.id}
      userName={session.user.name}
      userImage={session.user.image}
      chatId={chat.id}
      initialMessages={initialMessages}
    />
  );
}