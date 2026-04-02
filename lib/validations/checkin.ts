import { z } from "zod";

export const lookupAppointmentSchema = z.object({
  cpf: z.string().length(11),
  birthDate: z.string().min(1),
});

export const checkInSchema = z.object({
  appointmentId: z.string().min(1),
});
