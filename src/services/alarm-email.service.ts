import transporter from '../config/mail';
import env from '../config/env';

export class AlarmEmailService {
    //* When the rule is matched, it sends a detailed HTML error report to the specified e-mail.
    static async sendAlert(targetEmail: string, logData: any, ruleName: string) {
        try {
            const levelstr = logData.level.toUpperCase() || 'INFO';
            const color = (levelstr === 'CRITICAL' || levelstr === 'FATAL')
                ? '#e74c3c' // Kırmızı
                : (levelstr === 'ERROR' ? '#e67e22' : '#f1c40f');

            const htmlTemplate = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: ${color}; color: white; padding: 15px 20px;">
                        <h2 style="margin: 0;">🚨 TraceLog Alarm Sistemi</h2>
                        <p style="margin: 5px 0 0 0; font-size: 14px;">Kural Tetiklendi: <strong>${ruleName}</strong></p>
                    </div>
                    <div style="padding: 20px;">
                        <p>Sisteminizde belirlediğiniz bir kurala uyan yeni bir log tespit edildi. Detaylar aşağıdadır:</p>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 10px 0; font-weight: bold; width: 30%;">Proje ID:</td>
                                <td style="padding: 10px 0;"><code>${logData.projectId}</code></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 10px 0; font-weight: bold;">Seviye:</td>
                                <td style="padding: 10px 0;"><strong style="color: ${color};">${levelstr}</strong></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 10px 0; font-weight: bold;">Zaman:</td>
                                <td style="padding: 10px 0;">${new Date().toLocaleString('tr-TR')}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; font-weight: bold;" colspan="2">Mesaj Detayı:</td>
                            </tr>
                            <tr>
                                <td colspan="2" style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; font-family: monospace; font-size: 13px;">
                                    ${logData.message || 'Mesaj içeriği bulunamadı.'}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
                        Bu e-posta TraceLog otomatik uyarı sistemi tarafından gönderilmiştir.<br>
                        Spam koruması devrededir, bir sonraki uyarı bekleme süresi dolana kadar gönderilmeyecektir.
                    </div>
                </div>
            `;
            const mailOptions = {
                from: `"TraceLog Guardian" <${env.hostName}>`,
                to: targetEmail,
                subject: `[${levelstr}] TraceLog Bildirimi - ${ruleName}`,
                html: htmlTemplate
            }

            const info = await transporter.sendMail(mailOptions);
            console.log(`[AlertEmailService] Alarm successfully sent as email: ${info.messageId}`);
        } catch (error: any) {
            console.error('[AlertEmailService] An error occurred while sending email:', error);
        }
    }
}
