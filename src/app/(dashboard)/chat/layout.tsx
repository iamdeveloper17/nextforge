import { ChatSidebar } from "@/components/ai/chat-sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-m-4 flex h-[calc(100vh-4rem)] md:-m-6">
      <ChatSidebar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}