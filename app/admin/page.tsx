import { startOfDay, endOfDay } from "date-fns";
import { db } from "@/lib/db";
import { Card, CardTitle } from "@/components/ui";

export default async function AdminPage() {
  const today = new Date();
  const appointments = await db.appointment.findMany({
    where: { date: { gte: startOfDay(today), lte: endOfDay(today) } },
    include: { doctor: true },
    orderBy: { timeLabel: "asc" },
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Card className="p-6">
        <CardTitle>Agenda do dia</CardTitle>
        <div className="mt-4 space-y-3">
          {appointments.map((item) => (
            <div key={item.id} className="rounded-2xl border p-4">
              <p className="font-semibold">{item.patientName}</p>
              <p className="text-sm text-slate-600">{item.doctor.name} · {item.doctor.specialty} · {item.timeLabel}</p>
              <p className="text-sm text-slate-500">Status: {item.status}</p>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
