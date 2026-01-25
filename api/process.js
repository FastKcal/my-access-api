export default async function handler(req, res) {
  /* ================= CORS ================= */
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

  /* ================= READ BODY ================= */
  let raw = "";
  for await (const chunk of req) raw += chunk;

  let body = {};
  try {
    body = JSON.parse(raw);
  } catch {}

  /* ================= GET /syn ================= */
  let synText = "";
  try {
    const r = await fetch("https://token.devast.io/syn");
    synText = await r.text(); 
  } catch {
    synText = "0000_00000";
  }

  // syn wygląda np: "5867_22852:2993_42979:2993_34023"
  const first = synText.split(":")[0]; // "5867_22852"
  const prefix = first.split("_")[0];  // "5867"

  /* ================= BIG NUMBER ================= */
  // ~60 cyfr, jak oryginał
  let big = "";
  for (let i = 0; i < 60; i++) {
    big += Math.floor(Math.random() * 10);
  }

  /* ================= FINAL QUERY ================= */
  const qs = `${prefix}_${big}`;

  /* ================= RESPONSE ================= */
  // dokładnie to, czego oczekuje klient
  return res.status(200).json([
    1,      // Li[0]
    1,      // Li[1]
    qs,     // Li[2] -> idzie po ?
    Date.now()
  ]);
}
