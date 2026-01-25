export default async function handler(req, res) {
  /* ========== CORS ========== */
  const origin = req.headers.origin || "https://devast.io";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  /* ========== BODY ========== */
  let raw = "";
  for await (const c of req) raw += c;

  let body = {};
  try { body = JSON.parse(raw); } catch {}

  /**
   * OCZEKUJEMY:
   * body.syn = "5867_22852:2993_42979:2993_34023"
   */
  const syn = String(body.syn || "");

  // zabezpieczenie
  if (!/^\d+_\d+/.test(syn)) {
    return res.status(400).json({ error: "INVALID_SYN" });
  }

  const prefix = syn.split("_")[0]; // 5867

  /* ========== BIG NUMBER (60+ cyfr) ========== */
  let big = "";
  for (let i = 0; i < 62; i++) {
    big += Math.floor(Math.random() * 10);
  }

  const qs = `${prefix}_${big}`;

  return res.status(200).json([
    1,
    1,
    qs,
    Date.now()
  ]);
}
