import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "NextForge — AI SaaS Starter Kit",
    template: "%s | NextForge",
  },
  description:
    "Production-ready AI SaaS starter kit with auth, payments, AI streaming, and dashboard. Ship your AI product in days, not months.",
  keywords: [
    "Next.js",
    "AI SaaS",
    "starter kit",
    "boilerplate",
    "TypeScript",
    "MongoDB",
    "Prisma",
    "NextAuth",
    "Stripe",
    "Open Source",
  ],
  authors: [{ name: "Amit Kumar", url: "https://github.com/iamdeveloper17" }],
  creator: "Amit Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/iamdeveloper17/nextforge",
    title: "NextForge — AI SaaS Starter Kit",
    description:
      "Ship your AI SaaS in days, not months. Production-ready starter kit with auth, payments, and AI streaming.",
    siteName: "NextForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextForge — AI SaaS Starter Kit",
    description: "Ship your AI SaaS in days, not months.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}