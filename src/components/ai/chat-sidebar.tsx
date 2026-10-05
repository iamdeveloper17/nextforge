"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MessageSquare,
  Plus,
  Trash2,
  Loader2,
  CheckSquare,
  Square,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface Chat {
  id: string;
  title: string;
  updatedAt: string;
}

export function ChatSidebar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    ids: string[];
  }>({ open: false, ids: [] });
  const [deleting, setDeleting] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const loadChats = async () => {
    try {
      const res = await fetch("/api/chats");
      if (res.ok) {
        const data = await res.json();
        setChats(data);
      }
    } catch (err) {
      console.error("Failed to load chats:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sync active chat from pathname
  useEffect(() => {
    const match = pathname.match(/\/chat\/([^/]+)/);
    setActiveChatId(match ? match[1] : null);
  }, [pathname]);

  // Load chats on mount + pathname change
  useEffect(() => {
    loadChats();
  }, [pathname]);

  // Listen for chat-created event
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveChatId(customEvent.detail);
      }
      loadChats();
    };
    window.addEventListener("chat-created", handler as EventListener);
    return () =>
      window.removeEventListener("chat-created", handler as EventListener);
  }, []);

  // Listen for toggle-chat-sidebar event (from chat header mobile button)
  useEffect(() => {
    const handler = () => setMobileOpen((prev) => !prev);
    window.addEventListener("toggle-chat-sidebar", handler);
    return () => window.removeEventListener("toggle-chat-sidebar", handler);
  }, []);

  const handleNewChat = () => {
    loadChats();
    setMobileOpen(false);
    if (pathname === "/chat") {
      window.dispatchEvent(new CustomEvent("new-chat-requested"));
    } else {
      router.push("/chat");
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === chats.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(chats.map((c) => c.id)));
    }
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelected(new Set());
  };

  const askDelete = (ids: string[]) => {
    setDeleteDialog({ open: true, ids });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await Promise.all(
        deleteDialog.ids.map((id) =>
          fetch(`/api/chats/${id}`, { method: "DELETE" })
        )
      );
      setChats((prev) => prev.filter((c) => !deleteDialog.ids.includes(c.id)));
      if (deleteDialog.ids.some((id) => pathname === `/chat/${id}`)) {
        router.push("/chat");
      }
      exitSelectionMode();
    } finally {
      setDeleting(false);
      setDeleteDialog({ open: false, ids: [] });
    }
  };

  const sidebarContent = (
    <div className="flex h-full w-full flex-col bg-muted/30">
      {/* Header */}
      <div className="space-y-2 border-b p-3">
        {!selectionMode ? (
          <>
            <Button
              onClick={handleNewChat}
              className="w-full justify-start"
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
            {chats.length > 0 && (
              <Button
                onClick={() => setSelectionMode(true)}
                className="w-full justify-start text-xs"
                variant="ghost"
                size="sm"
              >
                <CheckSquare className="mr-2 h-3.5 w-3.5" />
                Select chats
              </Button>
            )}
          </>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {selected.size} selected
              </span>
              <button
                onClick={exitSelectionMode}
                className="rounded p-1 hover:bg-muted"
                aria-label="Exit selection"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={selectAll}
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
              >
                {selected.size === chats.length ? "Deselect all" : "Select all"}
              </Button>
              <Button
                onClick={() => askDelete(Array.from(selected))}
                disabled={selected.size === 0}
                variant="destructive"
                size="sm"
                className="flex-1 text-xs"
              >
                <Trash2 className="mr-1 h-3 w-3" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Chats list */}
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
              const isActive = activeChatId === chat.id;
              const isSelected = selected.has(chat.id);

              if (selectionMode) {
                return (
                  <button
                    key={chat.id}
                    onClick={() => toggleSelect(chat.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
                      isSelected
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {isSelected ? (
                      <CheckSquare className="h-3.5 w-3.5 shrink-0 text-primary" />
                    ) : (
                      <Square className="h-3.5 w-3.5 shrink-0" />
                    )}
                    <span className="flex-1 truncate text-left">
                      {chat.title}
                    </span>
                  </button>
                );
              }

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
                    onClick={() => {
                      setActiveChatId(chat.id);
                      setMobileOpen(false);
                    }}
                    className="flex flex-1 items-center gap-2 truncate px-2 py-2 text-sm"
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                    <span className="flex-1 truncate text-left">
                      {chat.title}
                    </span>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      askDelete([chat.id]);
                    }}
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

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-full w-64 shrink-0 border-r md:block">
        {sidebarContent}
      </aside>

      {/* Mobile sheet — opened via event from chat header */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Chat History</SheetTitle>
            <div className="h-full">{sidebarContent}</div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          !deleting && setDeleteDialog({ ...deleteDialog, open })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {deleteDialog.ids.length > 1
                ? `Delete ${deleteDialog.ids.length} chats?`
                : "Delete this chat?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteDialog.ids.length > 1
                ? "This will permanently delete the selected chats and all their messages. This action cannot be undone."
                : "This will permanently delete this chat and all its messages. This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}