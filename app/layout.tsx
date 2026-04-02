import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assistente de Agenda",
  description: "Check-in de pacientes para clínicas médicas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-semibold">Assistente de Agenda</Link>
            <nav className="flex gap-3 text-sm">
              <Link href="/kiosk" className="rounded-full px-3 py-1 hover:bg-slate-100">Totem</Link>
              <Link href="/login" className="rounded-full px-3 py-1 hover:bg-slate-100">Login</Link>
              <Link href="/doctor" className="rounded-full px-3 py-1 hover:bg-slate-100">Médico</Link>
              <Link href="/admin" className="rounded-full px-3 py-1 hover:bg-slate-100">Admin</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
