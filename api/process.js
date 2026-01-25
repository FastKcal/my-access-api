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

  // ZAWSZE 200, ZAWSZE POPRAWNE DANE
  // brak zależności od body / token.devast.io

  // prefix 4 cyfry
  const prefix = Math.floor(2000 + Math.random() * 8000);

  // 60–70 cyfr
  let seed = (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
  let long = "";
  for (let i = 0; i < 64; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    long += (seed % 10);
  }

  // UWAGA: BEZ '?' – klient sam dokleja
  const token = `${prefix}_${long}`;

  return res.status(200).json([
    1,          // Li[0]
    1,          // Li[1]
    token,      // Li[2]  <<< MUSI BYĆ STRING
    Date.now()  // Li[3]
  ]);
}
