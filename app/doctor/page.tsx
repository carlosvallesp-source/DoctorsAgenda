import { startOfDay, endOfDay } from "date-fns";
import { db } from "@/lib/db";
import { Card, CardTitle } from "@/components/ui";

export default async function DoctorPage() {
  const today = new Date();

  const appointments = await db.appointment.findMany({
    where: {
      date: { gte: startOfDay(today), lte: endOfDay(today) },
    },
    include: { doctor: true },
    orderBy: { timeLabel: "asc" },
  });

  const checkedIn = appointments.filter((item) => item.status === "CHECKED_IN");
  const pending = appointments.filter((item) => item.status !== "CHECKED_IN");

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <CardTitle>Pacientes com check-in</CardTitle>
          <div className="mt-4 space-y-3">
            {checkedIn.length === 0 ? <p>Nenhum check-in ainda.</p> : checkedIn.map((item) => (
              <div key={item.id} className="rounded-2xl bg-emerald-50 p-4">
                <p className="font-semibold">{item.patientName}</p>
                <p className="text-sm text-slate-600">{item.doctor.name} · {item.timeLabel}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <CardTitle>Pacientes pendentes</CardTitle>
          <div className="mt-4 space-y-3">
            {pending.length === 0 ? <p>Sem pacientes pendentes.</p> : pending.map((item) => (
              <div key={item.id} className="rounded-2xl bg-amber-50 p-4">
                <p className="font-semibold">{item.patientName}</p>
                <p className="text-sm text-slate-600">{item.doctor.name} · {item.timeLabel}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
