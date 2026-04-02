import { z } from "zod";

export const appointmentSchema = z.object({
  patientName: z.string().min(3),
  cpf: z.string().length(11),
  birthDate: z.string().min(1),
  date: z.string().min(1),
  timeLabel: z.string().min(1),
  doctorId: z.string().min(1),
});
