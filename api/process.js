export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        const response = await fetch('https://token.devast.io/syn', {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': '*/*',
                'Origin': 'https://devast.io',
                'Referer': 'https://devast.io/'
            }
        });

        if (!response.ok) throw new Error('Token fetch failed');

        const tokenData = await response.text();
        let region, server, query, token;

        if (tokenData.includes(',')) {
            const parts = tokenData.split(',');
            
            if (parts.length >= 4) {
                region = parts[0].trim();
                server = parts[1].trim();
                query = parts[2].trim();
                token = parts[3].trim();
            } else {
                token = parts[0].trim();
                region = 'frankfurt';
                server = '1';
                const p1 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
                const p2 = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
                const p3 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
                query = `8099_${p1}${p2}${p3}`;
            }
        } else {
            token = tokenData.trim();
            region = 'frankfurt';
            server = '1';
            const p1 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
            const p2 = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
            const p3 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
            query = `8099_${p1}${p2}${p3}`;
        }

        if (!token || token.length < 10) throw new Error('Invalid token');

        return res.status(200).json([
            region,
            String(server),
            query,
            token
        ]);

    } catch (error) {
        const p1 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
        const p2 = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
        const p3 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
        const queryString = `8099_${p1}${p2}${p3}`;
        
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let fallbackToken = '';
        for (let i = 0; i < 74; i++) {
            fallbackToken += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return res.status(200).json(['frankfurt', '1', queryString, fallbackToken]);
    }
}
