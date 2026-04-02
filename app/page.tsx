import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-wide text-slate-500">Projeto base</p>
        <h1 className="mt-2 text-4xl font-bold">Assistente de Agenda</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Base inicial em Next.js para check-in de pacientes em clínicas médicas.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/kiosk" className="rounded-2xl bg-slate-900 px-5 py-3 text-white">Abrir totem</Link>
          <Link href="/login" className="rounded-2xl border px-5 py-3">Entrar no painel</Link>
        </div>
      </div>
    </main>
  );
}
