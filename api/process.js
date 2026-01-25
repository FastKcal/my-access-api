// /api/process.js
export default function handler(req, res) {
  const origin = req.headers.origin || "https://devast.io";

  // ===== CORS =====
  res.setHeader(
    "Access-Control-Allow-Origin",
    origin.endsWith("devast.io") ? origin : "https://devast.io"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // ===== TOKEN (FORMAT JAK NATYWNY) =====
  // prefix: 4 cyfry
  const prefix = Math.floor(1000 + Math.random() * 9000);

  // long: dokładnie 64 cyfry
  let seed = (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
  let long = "";
  for (let i = 0; i < 64; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    long += (seed % 10).toString();
  }

  // UWAGA: BEZ '?'
  const token = `${prefix}_${long}`;

  // ===== ODPOWIEDŹ OCZEKIWANA PRZEZ KLIENTA =====
  return res.status(200).json([
    1,          // Li[0]
    1,          // Li[1]
    token,      // Li[2] -> doklejany BEZPOŚREDNIO do rooma
    Date.now()  // Li[3]
  ]);
}
