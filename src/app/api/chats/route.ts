import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const chats = await db.chat.findMany({
    where: {
      userId: session.user.id,
      messages: { some: {} }, // 👈 Only chats that have at least 1 message
    },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, updatedAt: true },
  });

  return NextResponse.json(chats);
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const chat = await db.chat.create({
    data: {
      userId: session.user.id,
      title: "New Chat",
    },
  });

  return NextResponse.json(chat);
}