import { validateComplaint } from "@/lib/complaint";
const attempts = globalThis.complaintAttempts || new Map();
globalThis.complaintAttempts = attempts;

function isRateLimited(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = attempts.get(ip);

  if (!current || current.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }

  current.count += 1;
  // ponytail: per-instance limit is enough for MVP; use a shared limiter if abuse appears.
  return current.count > 5;
}


export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Format data tidak valid." }, { status: 400 });
  }

  if (body.website) return Response.json({ ok: true });

  if (isRateLimited(request)) {
    return Response.json(
      { message: "Terlalu banyak percobaan. Coba lagi dalam beberapa menit." },
      { status: 429 },
    );
  }

  const result = validateComplaint(body);
  if (!result.success) {
    return Response.json(
      { message: "Periksa kembali data yang diisi.", errors: result.errors },
      { status: 400 },
    );
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return Response.json(
      { message: "Form aspirasi belum terhubung. Silakan hubungi kelurahan melalui WhatsApp." },
      { status: 503 },
    );
  }

  const ticketNumber = `TRT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const response = await fetch(`${url}/rest/v1/complaints`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      ticket_number: ticketNumber,
      ...result.value,
      status: "Baru",
    }),
  });

  if (!response.ok) {
    console.error("Supabase complaint insert failed", response.status);
    return Response.json(
      { message: "Aspirasi belum dapat dikirim. Coba lagi atau hubungi kelurahan." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, ticketNumber }, { status: 201 });
}
