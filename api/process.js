export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        // Generate token components
        const timestamp = Date.now();
        const r1 = Math.floor(Math.random() * 10000);
        const r2 = Math.floor(Math.random() * 10000);
        const r3 = Math.floor(Math.random() * 10000);
        const r4 = Math.floor(Math.random() * 10000);
        const r5 = Math.floor(Math.random() * 10000);
        const r6 = Math.floor(Math.random() * 10000);
        const r7 = Math.floor(Math.random() * 10000);
        
        // Generate session token (74 characters)
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let token = '';
        for (let i = 0; i < 74; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        // Build query string (from screenshot: 8099_227938703627973720924551291744736097223347481412127944441)
        const queryString = `8099_${r1}${r2}${r3}${r4}${r5}${r6}${r7}`;
        
        // Response format: [region, server, queryString, sessionToken]
        const response = [
            'frankfurt',    // Region
            '1',           // Server number
            queryString,   // Query string for WebSocket
            token          // Session token
        ];
        
        return res.status(200).json(response);
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}


