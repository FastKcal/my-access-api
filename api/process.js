// /api/process.js
export default async function handler(req, res) {
  const origin = req.headers.origin || "https://devast.io";

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // ===== STABILNY TOKEN =====

  // prefix (jak syn)
  const prefix = Math.floor(5000 + Math.random() * 6000);

  // długa liczba (dokładnie cyfry, bez znaków)
  let seed = (Date.now() + Math.floor(Math.random() * 1e9)) >>> 0;
  let long = "";
  for (let i = 0; i < 64; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    long += String(seed % 10);
  }

  const token = `${prefix}_${long}`;

  // ZAWSZE poprawny format
  return res.status(200).json([
    1,
    1,
    token,
    Date.now()
  ]);
}
