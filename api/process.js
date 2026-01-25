export default async function handler(req, res) {
  const origin = req.headers.origin;

  /* ===== CORS ===== */
  res.setHeader(
    "Access-Control-Allow-Origin",
    origin && origin.endsWith("devast.io")
      ? origin
      : "https://devast.io"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  /* ===== TOKEN (FORMAT DEVAST) ===== */

  // prefix jak z token.devast.io/syn (2000–9000)
  const prefix = Math.floor(2000 + Math.random() * 7000);

  // długa liczba ~70 cyfr (LCG + timestamp)
  let seed = (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
  let long = "";

  for (let i = 0; i < 70; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    long += (seed % 10).toString();
  }

  // ⚠️ BEZ ZNAKU '?'
  const wsToken = `${prefix}_${long}`;

  /*
    Klient:
    Li[0] → 1
    Li[1] → 1
    Li[2] → STRING (NIEPUSTY, BEZ '?')
    Li[3] → cokolwiek != undefined
  */
  return res.status(200).json([
    1,
    1,
    wsToken,
    Date.now()
  ]);
}
