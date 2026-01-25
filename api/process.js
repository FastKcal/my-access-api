export default async function handler(req, res) {
  // ===== DODAJ CORS =====
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Obsługa preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  // ======================

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Generuj 2 losowe wartości
  const num1 = Math.floor(Math.random() * 3000) + 1000; // 1000-4000
  
  // MEGA DŁUGA LICZBA (jak oryginał)
  let num2 = '';
  for (let i = 0; i < 60; i++) { // 60-cyfrowa liczba
    num2 += Math.floor(Math.random() * 10);
  }

  // Format: "num1_num2"
  const token = num1 + '_' + num2;

  // Zwróć tablicę [val1, val2, token, timestamp]
  return res.status(200).json([
    num1,           // Li[0] - Client['AáÀÁå']
    parseInt(num2.substring(0, 10)), // Li[1] - Client['ÄÅâáÄ']
    token,          // Li[2] - Client['åaáaa']
    Date.now()      // Li[3] - Client['äÁÄÄÅ']
  ]);
}
