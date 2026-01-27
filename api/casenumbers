// /api/case-numbers.js - Endpoint zwracający permutację case numbers

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Case numbers array - permutacja case'ów w switch statement
  // To jest STAŁA wartość która określa mapowanie message types
  const caseNumbers = [
    70, 32, 15, 41, 24, 7, 6, 2, 60, 22, 40, 29, 52, 18, 25, 61,
    72, 14, 31, 66, 26, 55, 35, 42, 17, 68, 39, 0, 46, 53, 57, 19,
    69, 67, 56, 27, 11, 5, 8, 1, 36, 33, 28, 9, 45, 3, 64, 10,
    49, 38, 73, 47, 20, 71, 43, 34, 23, 16, 13, 4, 12, 30, 54, 44,
    48, 63, 65, 50, 59, 51, 62, 58, 37, 21
  ];

  return res.status(200).json(caseNumbers);
}
