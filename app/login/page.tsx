import Link from "next/link";
import { Card, CardTitle } from "@/components/ui";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Card className="p-8">
        <p className="text-sm uppercase tracking-wide text-slate-500">Acesso interno</p>
        <CardTitle className="mt-2">Login do médico e administração</CardTitle>
        <p className="mt-4 text-slate-600">
          Nesta base inicial, o fluxo de autenticação está preparado em <code>lib/auth.ts</code>.
          O próximo passo é ligar esse formulário ao Auth.js e proteger as rotas.
        </p>
        <div className="mt-6 space-y-2 text-sm text-slate-700">
          <p><strong>Usuário admin:</strong> admin / 1234</p>
          <p><strong>Usuário médico:</strong> ana / 1234</p>
        </div>
        <div className="mt-6 flex gap-3">
          <Link href="/doctor" className="rounded-2xl bg-slate-900 px-4 py-3 text-white">Ir para área médica</Link>
          <Link href="/admin" className="rounded-2xl border px-4 py-3">Ir para admin</Link>
        </div>
      </Card>
    </main>
  );
}
