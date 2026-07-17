import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { customers } from "../../../db/schema";

const customerStatuses = [
  "pending",
  "active",
  "isolated",
  "terminated",
] as const;

type CustomerStatus = (typeof customerStatuses)[number];

function errorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Terjadi kesalahan";

  if (message.includes("no such table")) {
    return "Tabel customers belum tersedia. Terapkan migrasi database terlebih dahulu.";
  }

  if (
    message.includes("UNIQUE constraint failed") ||
    message.includes("customers_org_number_unique")
  ) {
    return "Nomor pelanggan sudah digunakan.";
  }

  if (message.includes("FOREIGN KEY constraint failed")) {
    return "Organisasi, paket internet, atau router tidak ditemukan.";
  }

  return message;
}

export async function GET(request: Request) {
  try {
    const organizationId = new URL(request.url).searchParams
      .get("organizationId")
      ?.trim();

    if (!organizationId) {
      return Response.json(
        { error: "organizationId wajib diisi" },
        { status: 400 },
      );
    }

    const db = getDb();
    const rows = await db
      .select()
      .from(customers)
      .where(eq(customers.organizationId, organizationId))
      .orderBy(desc(customers.createdAt), desc(customers.id))
      .limit(100);

    return Response.json({ customers: rows });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      organizationId?: string;
      planId?: string | null;
      routerId?: string | null;
      customerNumber?: string;
      name?: string;
      email?: string | null;
      phone?: string;
      address?: string;
      area?: string | null;
      latitude?: number | null;
      longitude?: number | null;
      pppoeUsername?: string | null;
      pppoePasswordEncrypted?: string | null;
      dueDay?: number;
      status?: CustomerStatus;
    };

    const organizationId = payload.organizationId?.trim() ?? "";
    const customerNumber = payload.customerNumber?.trim() ?? "";
    const name = payload.name?.trim() ?? "";
    const phone = payload.phone?.trim() ?? "";
    const address = payload.address?.trim() ?? "";
    const dueDay = payload.dueDay ?? 20;
    const status = payload.status ?? "pending";

    if (!organizationId || !customerNumber || !name || !phone || !address) {
      return Response.json(
        {
          error:
            "organizationId, customerNumber, name, phone, dan address wajib diisi",
        },
        { status: 400 },
      );
    }

    if (!Number.isInteger(dueDay) || dueDay < 1 || dueDay > 31) {
      return Response.json(
        { error: "dueDay harus berupa angka dari 1 sampai 31" },
        { status: 400 },
      );
    }

    if (!customerStatuses.includes(status)) {
      return Response.json(
        { error: "Status pelanggan tidak valid" },
        { status: 400 },
      );
    }

    const db = getDb();
    const [customer] = await db
      .insert(customers)
      .values({
        id: crypto.randomUUID(),
        organizationId,
        planId: payload.planId?.trim() || null,
        routerId: payload.routerId?.trim() || null,
        customerNumber,
        name,
        email: payload.email?.trim() || null,
        phone,
        address,
        area: payload.area?.trim() || null,
        latitude: payload.latitude ?? null,
        longitude: payload.longitude ?? null,
        pppoeUsername: payload.pppoeUsername?.trim() || null,
        pppoePasswordEncrypted:
          payload.pppoePasswordEncrypted?.trim() || null,
        dueDay,
        status,
      })
      .returning();

    return Response.json({ customer }, { status: 201 });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}
