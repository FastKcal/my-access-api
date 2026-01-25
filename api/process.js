export default async function handler(req, res) {
  /* ========= CORS ========= */
  res.setHeader("Access-Control-Allow-Origin", "https://devast.io");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  /* ========= BODY (text/plain) ========= */
  let raw = "";

  try {
    for await (const chunk of req) raw += chunk;
  } catch {
    return res.status(400).json([0, 0, "", 0]);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    data = raw;
  }

  /* ========= KRYTYCZNE =========
     Klient oczekuje TABLICY 4 ELEMENTÓW
  */
  let A0 = 1; // Li[0]
  let A1 = 1; // Li[1]

  // Li[2] — MUSI BYĆ STRING, IDZIE DO WS
  let qs = typeof data === "object"
    ? `t=${data.token || ""}&sv=${data.serverVersion || ""}`
    : "";

  // Li[3] — cokolwiek !== undefined
  let ts = Date.now();

  return res.status(200).json([A0, A1, qs, ts]);
}
