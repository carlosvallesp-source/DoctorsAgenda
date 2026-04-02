"use client";

import { useState } from "react";
import { Button, Card, CardTitle, Input } from "@/components/ui";
import { formatCpf, onlyDigits } from "@/lib/utils";

type LookupResponse = {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  timeLabel: string;
  status: string;
};

export default function KioskPage() {
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [appointment, setAppointment] = useState<LookupResponse | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setAppointment(null);

    const response = await fetch("/api/appointments/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf: onlyDigits(cpf), birthDate }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error || "Não foi possível localizar o agendamento.");
      return;
    }

    if (data.status === "CHECKED_IN") {
      setMessage("Seu check-in já foi realizado.");
    } else {
      setMessage("Agendamento encontrado. Confirme para concluir o check-in.");
    }

    setAppointment(data);
  }

  async function handleCheckIn() {
    if (!appointment) return;
    setLoading(true);
    const response = await fetch("/api/appointments/check-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointmentId: appointment.id }),
    });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? "Check-in realizado com sucesso." : data.error || "Erro ao confirmar check-in.");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Card className="p-8">
        <p className="text-sm uppercase tracking-wide text-slate-500">Totem</p>
        <CardTitle className="mt-2 text-4xl">Check-in do paciente</CardTitle>
        <p className="mt-3 text-lg text-slate-600">Informe CPF e data de nascimento.</p>

        <form onSubmit={handleLookup} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-lg font-medium">CPF</label>
            <Input value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} placeholder="000.000.000-00" className="text-2xl" />
          </div>
          <div>
            <label className="mb-2 block text-lg font-medium">Data de nascimento</label>
            <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="text-2xl" />
          </div>
          <Button disabled={loading} className="w-full text-xl">{loading ? "Processando..." : "Buscar agendamento"}</Button>
        </form>

        {message ? <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-lg">{message}</div> : null}

        {appointment ? (
          <div className="mt-6 rounded-2xl border p-5">
            <p><strong>Paciente:</strong> {appointment.patientName}</p>
            <p><strong>Médico:</strong> {appointment.doctorName}</p>
            <p><strong>Especialidade:</strong> {appointment.specialty}</p>
            <p><strong>Horário:</strong> {appointment.timeLabel}</p>
            {appointment.status !== "CHECKED_IN" ? (
              <Button onClick={handleCheckIn} disabled={loading} className="mt-4 w-full text-xl">Confirmar check-in</Button>
            ) : null}
          </div>
        ) : null}
      </Card>
    </main>
  );
}
