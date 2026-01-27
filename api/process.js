export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        // Query format: 8099_5229009146648096195797666599 (28 cyfr po _)
        const randomDigits = Math.floor(Math.random() * 1e28).toString().padStart(28, '0');
        const queryString = `8099_${randomDigits}`;
        
        // Token 74 chars
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let token = '';
        for (let i = 0; i < 74; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return res.status(200).json([
            'frankfurt',
            '5',
            queryString,
            token
        ]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
