export default function AboutPage() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          About NextForge
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            NextForge is an open-source, production-ready AI SaaS starter kit.
            It gives developers the foundation they need to ship their AI
            products in days instead of months.
          </p>

          <h2 className="mt-12 text-2xl font-bold">Why NextForge?</h2>
          <p className="mt-4 text-muted-foreground">
            Every AI SaaS needs the same boring infrastructure: authentication,
            payments, a dashboard, an admin panel, email, and rate limiting. We
            built NextForge so you can skip that part and focus on what makes
            your product unique.
          </p>

          <h2 className="mt-12 text-2xl font-bold">Tech Stack</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>
              <strong>Framework:</strong> Next.js 16 (App Router, Turbopack)
            </li>
            <li>
              <strong>Language:</strong> TypeScript
            </li>
            <li>
              <strong>Database:</strong> MongoDB + Prisma
            </li>
            <li>
              <strong>Auth:</strong> NextAuth v5 with Prisma Adapter
            </li>
            <li>
              <strong>AI:</strong> Vercel AI SDK + Groq (gpt-oss-120b)
            </li>
            <li>
              <strong>UI:</strong> shadcn/ui (Nova preset) + Tailwind CSS v4
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold">License</h2>
          <p className="mt-4 text-muted-foreground">
            NextForge is MIT licensed — free for personal and commercial use.
          </p>
        </div>
      </div>
    </section>
  );
}