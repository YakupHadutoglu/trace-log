export class DiscordService {
    private static getColorBySeverity(severity: string): number {
        const level = severity?.toUpperCase() || 'INFO';
        switch (level) {
            case 'FATAL':
            case 'CRITICAL':
                return 16711680; //* red
            case 'ERROR':
                return 16744192; //* orange
            case 'WARN':
            case 'WARNING':
                return 16776960; //* yellow
            case 'INFO':
                return 3447003; //* blue
            case 'DEBUG':
                return 10070709; //* gray


            default:
                return 3447003; //* default to blue for unknown levels;
        }
    }

    static async sendAlert(webhookUrl: string, logData: any, ruleName: string) {
        try {
            const color = this.getColorBySeverity(logData.severity);

            const payload = {
                userName: 'TraceLog Guardian', //* Name of the bot in the channel
                avatar_url: "https://cdn-icons-png.flaticon.com/512/4712/4712010.png", //* Avatar for the bot
                embeds: [
                    {
                        title: `🚨 Alarm Tetiklendi: ${ruleName}`,
                        description: `**TraceLog** sisteminde belirlediğiniz bir kural eşleşti!`,
                        color: color,
                        fields: [
                            {
                                name: "📌 Proje ID",
                                value: `\`${logData.projectId || 'Bilinmiyor'}\``,
                                inline: true
                            },
                            {
                                name: "⚠️ Seviye",
                                value: `\`${logData.severity || 'INFO'}\``,
                                inline: true
                            },
                            {
                                name: "📝 Mesaj",
                                value: `\`\`\`${logData.message || 'Mesaj içeriği yok'}\`\`\``,
                                inline: false
                            },
                            {
                                name: "⏱️ Zaman",
                                value: new Date().toLocaleString('tr-TR'),
                                inline: false
                            }
                        ],
                        footer: {
                            text: "TraceLog Monitoring System"
                        }
                    }
                ]

            }
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                console.error(`[DiscordService] Webhook failed: ${response.statusText}`);
            } else {
                console.log(`[DiscordService] Alarm successfully forwarded to Discord!`);
            }
        } catch (error) {
            console.error('[DiscordService] An unexpected error occurred:', error);
        }
    }
}
