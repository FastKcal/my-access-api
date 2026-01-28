export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        // Proxy do /dyn
        const response = await fetch('https://token.devast.io/dyn', {
            method: req.method,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': '*/*',
                'Origin': 'https://devast.io',
                'Referer': 'https://devast.io/',
                'Content-Type': req.headers['content-type'] || 'application/json'
            },
            body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
        });
        
        if (!response.ok) {
            throw new Error(`/dyn returned ${response.status}`);
        }
        
        const data = await response.json();
        return res.status(200).json(data);
        
    } catch (error) {
        console.error('/dyn proxy error:', error);
        return res.status(500).json({ 
            error: 'Proxy failed',
            message: error.message 
        });
    }
}
