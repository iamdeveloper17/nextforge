"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MessageSquare, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Chat {
  id: string;
  title: string;
  updatedAt: string;
}

export function ChatSidebar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/chats");
        if (res.ok && mounted) {
          const data = await res.json();
          setChats(data);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [pathname]);

const handleNewChat = () => {
  router.push("/chat");
  router.refresh();
};

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Delete this chat?")) return;

    const res = await fetch(`/api/chats/${id}`, { method: "DELETE" });
    if (res.ok) {
      setChats((prev) => prev.filter((c) => c.id !== id));
      if (pathname === `/chat/${id}`) {
        router.push("/chat");
      }
    }
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/30">
      <div className="border-b p-3">
        <Button
          onClick={handleNewChat}
          className="w-full justify-start"
          variant="outline"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        ) : chats.length === 0 ? (
          <p className="p-4 text-center text-xs text-muted-foreground">
            No chats yet. Start a new one!
          </p>
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => {
              const isActive = pathname === `/chat/${chat.id}`;
              return (
                <div
                  key={chat.id}
                  className={cn(
                    "group relative flex items-center rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Link
                    href={`/chat/${chat.id}`}
                    className="flex flex-1 items-center gap-2 truncate px-2 py-2 text-sm"
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                    <span className="flex-1 truncate text-left">
                      {chat.title}
                    </span>
                  </Link>
                  <button
                    onClick={(e) => handleDelete(chat.id, e)}
                    className={cn(
                      "mr-1 rounded p-1 opacity-0 transition-opacity group-hover:opacity-100",
                      isActive && "text-primary-foreground hover:bg-primary/20"
                    )}
                    aria-label="Delete chat"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}