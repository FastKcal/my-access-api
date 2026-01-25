export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  // ===== CORS – ZAWSZE NAJPIERW =====
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://devast.io",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true"
  };

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    // ===== DYN =====
    const dynRes = await fetch("https://token.devast.io/dyn");
    if (!dynRes.ok) {
      return new Response(JSON.stringify({ error: "dyn failed" }), {
        status: 502,
        headers: corsHeaders
      });
    }

    const dynText = await dynRes.text();

    // 3203_[...]:3203_[...]
    const first = dynText.split(":")[0];
    const [prefix, arr] = first.split("_");
    const nums = JSON.parse(arr);

    // ===== GENERACJA =====
    let acc = 0n;
    for (const n of nums) {
      acc = (acc << 32n) ^ BigInt(n >>> 0);
    }

    let suffix = acc.toString();
    while (suffix.length < 60) suffix += suffix;
    suffix = suffix.slice(0, 60);

    const token = `${prefix}_${suffix}`;

    return new Response(
      JSON.stringify([1, 1, token, Date.now()]),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );

  } catch (e) {
    return new Response(
      JSON.stringify({ error: "crash", message: e.message }),
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}
