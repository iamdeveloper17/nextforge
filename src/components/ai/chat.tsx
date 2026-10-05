"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Loader2, Sparkles, Plus, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message } from "@/components/ai/message";

interface ChatProps {
  userName?: string | null;
  userImage?: string | null;
  chatId?: string | null;
  initialMessages?: Array<{
    id: string;
    role: "user" | "assistant";
    parts: Array<{ type: "text"; text: string }>;
  }>;
}

const suggestions = [
  "Explain Next.js App Router in 3 lines",
  "Write a MongoDB query to find all users",
  "Give me 5 startup name ideas for an AI tool",
  "How does Stripe webhook work?",
];

export function Chat({
  userName,
  userImage,
  chatId: initialChatId,
  initialMessages = [],
}: ChatProps) {
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<string | null>(initialChatId ?? null);

  const { messages, sendMessage, status, setMessages } = useChat({
    id: initialChatId ?? "new-chat",
    transport: new DefaultChatTransport({
      api: "/api/ai/chat",
      prepareSendMessagesRequest: ({ messages: msgs, body }) => ({
        body: { ...body, messages: msgs, chatId },
      }),
      fetch: async (input, init) => {
        const response = await fetch(input, init);
        const newChatId = response.headers.get("X-Chat-Id");
        if (newChatId && newChatId !== chatId) {
          setChatId(newChatId);
          window.history.replaceState(null, "", `/chat/${newChatId}`);
          window.dispatchEvent(
            new CustomEvent("chat-created", { detail: newChatId })
          );
        }
        return response;
      },
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset when server-side chat changes
  useEffect(() => {
    setMessages(initialMessages as never);
    setChatId(initialChatId ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialChatId]);

  // Listen for "new-chat-requested" event (from sidebar New Chat)
  useEffect(() => {
    const handler = () => {
      setMessages([] as never);
      setChatId(null);
      setInput("");
      window.history.replaceState(null, "", "/chat");
    };
    window.addEventListener("new-chat-requested", handler);
    return () => window.removeEventListener("new-chat-requested", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = (text: string) => {
    const t = text.trim();
    if (!t || isLoading) return;
    sendMessage({ text: t });
    setInput("");
  };

  const handleNewChatMobile = () => {
    window.dispatchEvent(new CustomEvent("new-chat-requested"));
  };

  const handleToggleSidebar = () => {
    window.dispatchEvent(new CustomEvent("toggle-chat-sidebar"));
  };

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          {/* Mobile: hamburger to open chat history */}
{/* Mobile: chat history button */}
<button
  onClick={handleToggleSidebar}
  className="rounded-md p-1.5 hover:bg-muted md:hidden"
  aria-label="Open chat history"
>
  <History className="h-5 w-5" />
</button>
          <div className="rounded-md bg-primary/10 p-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">NextForge AI</p>
            <p className="text-xs text-muted-foreground">Powered by Groq</p>
          </div>
        </div>
        {/* Mobile: New Chat button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNewChatMobile}
          className="md:hidden"
        >
          <Plus className="mr-1 h-4 w-4" />
          New
        </Button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                How can I help you today?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Ask anything — code, ideas, explanations
              </p>
            </div>
            <div className="grid w-full max-w-2xl gap-2 sm:grid-cols-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="rounded-lg border bg-background p-3 text-left text-sm transition-colors hover:bg-muted"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((m) => (
              <Message
                key={m.id}
                message={m}
                userName={userName}
                userImage={userImage}
              />
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="mx-auto flex max-w-3xl items-end gap-2"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(input);
              }
            }}
            placeholder="Send a message..."
            rows={1}
            className="flex-1 resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            style={{ maxHeight: "200px" }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </Button>
        </form>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          NextForge AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}