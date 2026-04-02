import { NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";
import { db } from "@/lib/db";
import { lookupAppointmentSchema } from "@/lib/validations/checkin";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = lookupAppointmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const today = new Date();
  const birthDate = new Date(parsed.data.birthDate);
  birthDate.setHours(0, 0, 0, 0);

  const appointment = await db.appointment.findFirst({
    where: {
      cpf: parsed.data.cpf,
      birthDate,
      date: {
        gte: startOfDay(today),
        lte: endOfDay(today),
      },
    },
    include: { doctor: true },
  });

  if (!appointment) {
    return NextResponse.json({ error: "Agendamento não encontrado." }, { status: 404 });
  }

  return NextResponse.json({
    id: appointment.id,
    patientName: appointment.patientName,
    doctorName: appointment.doctor.name,
    specialty: appointment.doctor.specialty,
    timeLabel: appointment.timeLabel,
    status: appointment.status,
  });
}
