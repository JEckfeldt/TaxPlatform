import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Manrope, IBM_Plex_Mono, Sora } from "next/font/google";
import { PersonaProvider } from "@/components/persona/persona-provider";
import { PERSONA_COOKIE } from "@/lib/persona-cookie";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "GreenGrowth — Tax platform prototype",
  description:
    "AI-powered client & CPA tax platform case study prototype. Frontend UX demo with simulated data and AI.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialPersonaId = cookieStore.get(PERSONA_COOKIE)?.value ?? null;

  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <PersonaProvider initialPersonaId={initialPersonaId}>
          {children}
        </PersonaProvider>
      </body>
    </html>
  );
}
