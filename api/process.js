export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        // Query: 8099_5229009146648096195797666599
        const part1 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
        const part2 = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
        const part3 = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
        const queryString = `8099_${part1}${part2}${part3}`;
        
        // Token 74 chars
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let token = '';
        for (let i = 0; i < 74; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        // WAŻNE: wszystko jako stringi!
        return res.status(200).json([
            'frankfurt',     // region (string)
            '5',            // server (STRING nie number!)
            queryString,    // query
            token           // token
        ]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
