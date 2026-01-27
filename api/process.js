export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // GET /api/process - zwraca to samo co POST (dla kompatybilności)
    if (req.method === 'GET') {
        try {
            const part1 = Math.floor(Math.random() * 1000000000).toString();
            const part2 = Math.floor(Math.random() * 1000000000).toString();
            const part3 = Math.floor(Math.random() * 1000000000).toString();
            const queryString = `8099_${part1}${part2}${part3}`;
            
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
    
    // POST /api/process
    if (req.method === 'POST') {
        try {
            const part1 = Math.floor(Math.random() * 1000000000).toString();
            const part2 = Math.floor(Math.random() * 1000000000).toString();
            const part3 = Math.floor(Math.random() * 1000000000).toString();
            const queryString = `8099_${part1}${part2}${part3}`;
            
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
    
    return res.status(405).json({ error: 'Method not allowed' });
}
