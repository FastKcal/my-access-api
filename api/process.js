// /api/process.js
export default async function handler(req, res) {
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

  // ===== 1. POBIERZ DYN =====
  const dynRes = await fetch("https://token.devast.io/dyn", {
    headers: { "Accept": "*/*" }
  });
  const dynText = await dynRes.text();

  // format:
  // 3203_[...]:3203_[...]:3203_[...]
  const parts = dynText.split(":");
  const first = parts[0];

  const [prefixStr, arrStr] = first.split("_");
  const prefix = prefixStr;

  const nums = JSON.parse(arrStr); // [2731182734, ...]
  
  // ===== 2. GENERUJ SUFFIX (IDENTYCZNIE) =====
  let acc = BigInt(0);
  for (let i = 0; i < nums.length; i++) {
    acc = (acc << 32n) ^ BigInt(nums[i]);
  }

  // rozciągnij do ~60 cyfr
  let suffix = acc.toString();
  while (suffix.length < 60) {
    suffix += suffix;
  }
  suffix = suffix.slice(0, 60);

  // ===== 3. FINAL TOKEN =====
  const token = `${prefix}_${suffix}`;

  return res.status(200).json([
    1,
    1,
    token,
    Date.now()
  ]);
}
