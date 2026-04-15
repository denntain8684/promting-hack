import type { Metadata } from "next";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora-var",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans-var",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prompting Hack — Gamifiziertes KI-Training",
  description:
    "Werde zum Prompt-Champion — Trainiere KI-Prompting im Versicherungskontext der Mecklenburgischen Versicherung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full`}
      style={
        {
          "--font-sora": "var(--font-sora-var)",
          "--font-dm-sans": "var(--font-dm-sans-var)",
          "--font-mono": "var(--font-mono-var)",
        } as React.CSSProperties
      }
    >
      <body
        className="min-h-full flex flex-col antialiased"
        style={{
          backgroundColor: "#1A1A1A",
          color: "#FAFAFA",
          fontFamily: "var(--font-dm-sans-var, 'DM Sans', sans-serif)",
        }}
      >
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
