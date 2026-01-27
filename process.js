// API endpoint do generowania tokenów dla devast.io
// Deploy na Vercel: vercel.com

const CASE_NUMBERS = [70,32,15,41,24,7,6,2,60,22,40,29,52,18,25,61,72,14,31,66,26,55,35,42,17,68,39,0,46,53,57,19,69,67,56,27,11,5,8,1,36,33,28,9,45,3,64,10,49,38,73,47,20,71,43,34,23,16,13,4,12,30,54,44,48,63,65,50,59,51,62,58,37,21];

// Funkcja pomocnicza do obliczeń
function åâaÅá(a, m, A) {
    return (a ^ m ^ A) >>> 0;
}

function Aåâãa(B, c, p, a) {
    return ((B + c + p + a) >>> 0) % 0x100000000;
}

// Główna funkcja generująca token
function aåáÀå(L, y, k, u, R, N) {
    const a = ~(L & 0x5602) & 0x5602 | ~(L & 0x5602) & L;
    const m = (0x3c6ef35f + (y + 0x176a) * 0x19660d) % 0x100000000;
    const A = ~(k & 0x4243) & 0x4243 | ~(k & 0x4243) & k;
    const B = (0x1 + (u + 0x20e1) * 0x15a4e35) % 0x100000000;
    const c = ((0x73e6 + R) * 0x15a4e35 + 0x1) % 0x100000000;
    const p = ~(N & 0x16d8) & (N | 0x16d8);
    
    const H = åâaÅá(a, m, A);
    const z = Aåâãa(B, c, p, a);
    
    const S = (0x0 << ((H ^ z) >> 0x0 & 0xff)) + 
              (0x10 << ((H ^ z) >> 0x8 & 0xff)) + 
              (0x18 << ((H ^ z) >> 0x18 & 0xff)) + 
              (0x8 << ((H ^ z) >> 0x8 & 0xff));
    
    return S;
}

// Generowanie tokenu sesji
function generateToken() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let token = '';
    for (let i = 0; i < 74; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

// Handler dla Vercel serverless function
export default async function handler(req, res) {
    // CORS headers
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
        // Parsowanie danych wejściowych
        const inputData = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        
        // Generowanie parametrów
        const timestamp = Date.now();
        const random1 = Math.floor(Math.random() * 0xFFFF);
        const random2 = Math.floor(Math.random() * 0xFFFF);
        const random3 = Math.floor(Math.random() * 0xFFFF);
        const random4 = Math.floor(Math.random() * 0xFFFF);
        const random5 = Math.floor(Math.random() * 0xFFFF);
        
        // Obliczanie tokenu używając funkcji aåáÀå
        const tokenValue = aåáÀå(random1, random2, random3, random4, random5, timestamp & 0xFFFF);
        
        // Generowanie końcowego tokenu
        const sessionToken = generateToken();
        
        // Generowanie query string dla WebSocket
        const queryString = `8099_${timestamp}${random1}${random2}${random3}${random4}`;
        
        // Zwracanie wyników w formacie oczekiwanym przez klienta
        // [AáÀÁå, ÄÅâáÄ, åaáaa, äÁÄÄÅ]
        const response = [
            'frankfurt',           // Region/server (AáÀÁå)
            '1',                   // Numer serwera (ÄÅâáÄ)
            queryString,           // Query string do WebSocket (åaáaa)
            sessionToken           // Token sesji (äÁÄÄÅ)
        ];
        
        res.status(200).json(response);
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}

// Export dla Node.js (opcjonalny)
export { aåáÀå, generateToken, CASE_NUMBERS };
