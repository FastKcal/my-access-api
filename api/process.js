export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    
    // Gra wysyła body jako text/plain z response z /syn
    // Format: |24010_36097:12147_64331:12147_54965
    // LUB: region,server,query,token
    
    const p1 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
    const p2 = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
    const p3 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
    const query = `8099_${p1}${p2}${p3}`;
    
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let token = '';
    for (let i = 0; i < 74; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Zwróć to co gra oczekuje
    return res.status(200).json(['frankfurt', '1', query, token]);
}
