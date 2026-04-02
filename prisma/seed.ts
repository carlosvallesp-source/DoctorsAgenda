import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hash("1234", 10);
  const doctorPassword = await hash("1234", 10);

  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      name: "Administrador",
      username: "admin",
      passwordHash: adminPassword,
      role: Role.ADMIN,
    },
  });

  const doctorUser = await prisma.user.upsert({
    where: { username: "ana" },
    update: {},
    create: {
      name: "Dra. Ana Costa",
      username: "ana",
      passwordHash: doctorPassword,
      role: Role.DOCTOR,
    },
  });

  const doctor = await prisma.doctor.upsert({
    where: { userId: doctorUser.id },
    update: {},
    create: {
      name: "Dra. Ana Costa",
      specialty: "Cardiologia",
      userId: doctorUser.id,
    },
  });

  const today = new Date();
  today.setHours(9, 0, 0, 0);

  const birthDate = new Date("1985-03-14");
  birthDate.setHours(0, 0, 0, 0);

  await prisma.appointment.createMany({
    data: [
      {
        patientName: "Maria Silva",
        cpf: "12345678901",
        birthDate,
        date: today,
        timeLabel: "09:00",
        doctorId: doctor.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log({ admin: admin.username, doctor: doctor.name });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
