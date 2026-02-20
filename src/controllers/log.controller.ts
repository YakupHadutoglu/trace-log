import { Request, Response } from 'express';

export const ingestLog = async (req: Request, res: Response) => {
    // 1. Gelen isteği terminale renkli ve havalı basalım
    console.log('\n🔥 [TRACE-LOG] Yeni Log Yakalandı!');
    console.log('------------------------------------------------');
    console.log('🔑 API Key (Header):', req.headers['authorization']);
    console.log('📦 Log İçeriği (Body):', req.body);
    console.log('------------------------------------------------\n');

    // 2. Client beklemesin diye hemen 200 dönelim
    res.status(200).json({ success: true, message: 'Log backend tarafindan alindi.' });
};
