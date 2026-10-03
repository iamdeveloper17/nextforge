import { auth } from "@/lib/auth";
import { Chat } from "@/components/ai/chat";

export default async function ChatPage() {
  const session = await auth();

  return (
    <Chat
      key="new"
      chatId={null}
      userName={session?.user?.name}
      userImage={session?.user?.image}
      initialMessages={[]}
    />
  );
}