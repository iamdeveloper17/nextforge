const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

(async () => {
  try {
    const chats = await db.chat.findMany({
      include: { messages: true },
    });

    console.log(`Total chats: ${chats.length}`);

    let deleted = 0;
    for (const chat of chats) {
      if (chat.messages.length === 0) {
        await db.chat.delete({ where: { id: chat.id } });
        console.log(`Deleted: ${chat.title} (${chat.id})`);
        deleted++;
      }
    }

    console.log(`\n✅ Deleted ${deleted} empty chats`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await db.$disconnect();
  }
})();