import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { auth } from "@/lib/auth";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={session?.user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}