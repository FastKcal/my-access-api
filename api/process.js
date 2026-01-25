export default async function handler(req, res) {
    try {
        let body = '';

        // Vercel edge / node compatibility
        for await (const chunk of req) {
            body += chunk;
        }

        // body przychodzi jako TEXT
        let data;
        try {
            data = JSON.parse(body);
        } catch {
            // jeśli to nie JSON – zwróć surowe
            data = body;
        }

        // 👇 dokładnie to, czego oczekuje klient
        // tablica 4 elementów
        if (Array.isArray(data)) {
            return res.status(200).json([
                data[0],
                data[1],
                data[2],
                data[3]
            ]);
        }

        // fallback
        return res.status(200).json([
            data,
            null,
            null,
            null
        ]);

    } catch (e) {
        return res.status(500).json([
            null,
            null,
            null,
            null
        ]);
    }
}
