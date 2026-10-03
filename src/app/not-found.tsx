import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-7xl font-bold tracking-tight">404</h1>
      <h2 className="mb-2 text-2xl font-semibold">Page not found</h2>
      <p className="mb-8 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}