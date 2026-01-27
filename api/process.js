export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Ignoruj body z /syn (bo i tak nie działa)
    // Generuj własne dane:
    
    // 1. Query string (33 znaki: "8099_" + 28 cyfr)
    const p1 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
    const p2 = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
    const p3 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
    const query = `8099_${p1}${p2}${p3}`;
    
    // 2. Token (74 znaki alfanumeryczne)
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let token = '';
    for (let i = 0; i < 74; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // 3. Zwróć array: ['', '', query, token]
    // Index 0-1: puste stringi (NIGDY nie używane przez grę)
    // Index 2: query do WebSocket URL
    // Index 3: token do XOR wiadomości
    return res.status(200).json(['', '', query, token]);
}
