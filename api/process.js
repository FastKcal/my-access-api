export default async function handler(req, res) {
  const origin = req.headers.origin;

  /* ===== CORS – MUSI BYĆ ZAWSZE ===== */
  if (origin && origin.endsWith("devast.io")) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://devast.io");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  /* ===== PRE-FLIGHT ===== */
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  /* ===== TYLKO POST ===== */
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  /* ===== CZYTANIE BODY (TEXT) ===== */
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    data = raw;
  }

  /* ===== ODP. KTÓREJ OCZEKUJE KLIENT ===== */
  const A0 = 1;
  const A1 = 1;

const qs =
  typeof data === "object"
    ? `?t=${data.token || ""}&sv=${data.serverVersion || ""}`
    : "?ok=1";
  
  const ts = Date.now();

  return res.status(200).json([A0, A1, qs, ts]);
}

