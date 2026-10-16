import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nosso refúgio • Outubro a dois",
  description: "Escolham juntos a próxima estadia.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
