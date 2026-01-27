export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    try {
        // Generate query like: 8099_908512543359811516636588885
        const part1 = Math.floor(Math.random() * 1000000000).toString();
        const part2 = Math.floor(Math.random() * 1000000000).toString();
        const part3 = Math.floor(Math.random() * 1000000000).toString();
        
        const queryString = `8099_${part1}${part2}${part3}`;
        
        // Generate 74-char token
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let token = '';
        for (let i = 0; i < 74; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
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
