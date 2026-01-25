export default async function handler(req, res) {
  const origin = req.headers.origin || "";

  /* =====================================================
     CORS – DEVAST.IO
     ===================================================== */
  if (origin.endsWith("devast.io")) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://devast.io");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  /* =====================================================
     PREFLIGHT
     ===================================================== */
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  /* =====================================================
     TYLKO POST
     ===================================================== */
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  /* =====================================================
     BODY – DEVAST WYSYŁA TEXT / JSON (LOSOWO)
     ===================================================== */
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    data = {};
  }

  /* =====================================================
     WARTOŚCI OCZEKIWANE PRZEZ KLIENTA
     Li[0], Li[1], Li[2], Li[3]
     ===================================================== */
  const A0 = 1;
  const A1 = 1;

  const token = typeof data.token === "string" ? data.token : "";
  const serverVersion =
    typeof data.serverVersion === "string" ? data.serverVersion : "";

  /* =====================================================
     !!! WAŻNE !!!
     QS MUSI ZACZYNAĆ SIĘ OD '?'
     ===================================================== */
  const qs =
    token || serverVersion
      ? `?t=${encodeURIComponent(token)}&sv=${encodeURIComponent(
          serverVersion
        )}`
      : "?ok=1";

  const ts = Date.now();

  /* =====================================================
     ZWROT DOKŁADNIE JAK OCZEKUJE CLIENT
     ===================================================== */
  return res.status(200).json([A0, A1, qs, ts]);
}
