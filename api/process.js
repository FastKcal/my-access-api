export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    try {
        const timestamp = Date.now();
        const r1 = Math.floor(Math.random() * 10000);
        const r2 = Math.floor(Math.random() * 10000);
        const r3 = Math.floor(Math.random() * 10000);
        const r4 = Math.floor(Math.random() * 10000);
        const r5 = Math.floor(Math.random() * 10000);
        const r6 = Math.floor(Math.random() * 10000);
        const r7 = Math.floor(Math.random() * 10000);
        
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let token = '';
        for (let i = 0; i < 74; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        const queryString = `8099_${r1}${r2}${r3}${r4}${r5}${r6}${r7}`;
        
        return res.status(200).json([
            'frankfurt',
            '1',
            queryString,
            token
        ]);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
