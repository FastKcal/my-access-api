export default async function handler(req, res) {
  try {
    // ===== CORS (MUSI BYĆ NA POCZĄTKU) =====
    res.setHeader("Access-Control-Allow-Origin", "https://devast.io");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }

    // ===== FETCH DYN =====
    const dynRes = await fetch("https://token.devast.io/dyn");
    if (!dynRes.ok) {
      return res.status(502).json({ error: "dyn fetch failed" });
    }

    const dynText = await dynRes.text();
    // przykład:
    // 3203_[2731182734,...]:3203_[...]

    const [first] = dynText.split(":");
    const [prefix, arr] = first.split("_");

    const nums = JSON.parse(arr);

    // ===== GENERACJA SUFFIX =====
    let acc = 0n;
    for (const n of nums) {
      acc = (acc << 32n) ^ BigInt(n >>> 0);
    }

    let suffix = acc.toString();
    while (suffix.length < 60) suffix += suffix;
    suffix = suffix.slice(0, 60);

    const token = `${prefix}_${suffix}`;

    // ===== ODPOWIEDŹ (FORMAT JAK CLIENT) =====
    return res.status(200).json([
      1,
      1,
      token,
      Date.now()
    ]);

  } catch (err) {
    // ⛑️ nigdy nie crashuj bez odpowiedzi
    return res.status(500).json({
      error: "internal",
      message: err.message
    });
  }
}
