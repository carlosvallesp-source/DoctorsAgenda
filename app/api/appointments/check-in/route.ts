import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkInSchema } from "@/lib/validations/checkin";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = checkInSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const appointment = await db.appointment.findUnique({ where: { id: parsed.data.appointmentId } });

  if (!appointment) {
    return NextResponse.json({ error: "Consulta não encontrada." }, { status: 404 });
  }

  if (appointment.status === "CHECKED_IN") {
    return NextResponse.json({ error: "Check-in já realizado." }, { status: 409 });
  }

  const updated = await db.appointment.update({
    where: { id: parsed.data.appointmentId },
    data: { status: "CHECKED_IN", checkedInAt: new Date() },
  });

  return NextResponse.json(updated);
}
