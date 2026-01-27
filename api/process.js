export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    
    // ← TUTAJ PROBLEM: Vercel bez body-parser nie czyta req.body!
    // Musisz ręcznie odczytać stream:
    
    let body = '';
    for await (const chunk of req) {
        body += chunk.toString();
    }
    
    // Format body z /syn: |24010_36097:12147_64331:12147_54965
    // LUB: region,server,query,token
    
    // Fallback generation (bo /syn może nie działać):
    const p1 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
    const p2 = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
    const p3 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
    const query = `8099_${p1}${p2}${p3}`;
    
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let token = '';
    for (let i = 0; i < 74; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Zwróć: ['', '', query, token]
    return res.status(200).json(['', '', query, token]);
}
