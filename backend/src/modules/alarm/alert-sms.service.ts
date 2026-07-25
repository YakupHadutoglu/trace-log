export class AlertSmsService {
    //* When the rule matches, it sends a short SMS to the specified phone number.
    static async sendAlert(targetPhone: string, logData: any, ruleName: string) {
        try {
            const levelstr = logData.level.toUpperCase() || 'INFO';
            const shortMessage = `TraceLog [${levelstr}]: '${ruleName}' rule has been triggered. Project ID: ${logData.projectId}. Take a quick look at the system.`

            //* For now we are printing to the console (Mock).
            console.log(`[AlertSmsService] SMS Prepared -> Tel: ${targetPhone} | Message: ${shortMessage}`);

            //* örnek bir SMS Sağlayıcı (Provider) Entegrasyonu:
            /*
                const response = await fetch('https://api.sms.com/v1/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.SMS_API_KEY}`
                    },
                    body: JSON.stringify({
                        to: targetPhone,
                        message: shortMessage
                    })
                });

                if (!response.ok) {
                    throw new Error('SMS API did not respond.');
                }
            */
            console.log(`[AlertSmsService] The SMS has been successfully delivered to the queue.`);
        } catch (error: any) {
            console.error('[AlertSmsService] An error occurred while sending SMS:', error);
        }
    }
}
