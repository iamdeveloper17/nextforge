import { auth } from "@/lib/auth";
import { Chat } from "@/components/ai/chat";

export default async function ChatPage() {
  const session = await auth();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">AI Chat</h1>
        <p className="text-muted-foreground">
          Chat with NextForge AI — fast, free, and private
        </p>
      </div>
      <Chat
        userName={session?.user?.name}
        userImage={session?.user?.image}
      />
    </div>
  );
}