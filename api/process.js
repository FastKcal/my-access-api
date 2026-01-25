export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Vercel czasem parsuje JSON, czasem nie — robimy safe:
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const token = String(body?.token || "");
  const serverVersion = String(body?.serverVersion || "");
  const ts = Date.now();

  // te 2 wartości są w kliencie jako Li[0] i Li[1]
  const A0 = 1;
  const A1 = 1;

  // to jest Li[2] i idzie po '?' do WebSocketa
  const qs = `t=${encodeURIComponent(token)}&sv=${encodeURIComponent(serverVersion)}&ts=${ts}`;

  // Li[3] byle nie undefined
  return res.status(200).json([A0, A1, qs, ts]);
}
