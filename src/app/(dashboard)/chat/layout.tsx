import { ChatSidebar } from "@/components/ai/chat-sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-m-6 flex h-[calc(100vh-4rem)]">
      <ChatSidebar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}