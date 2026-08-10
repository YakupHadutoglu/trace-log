import { LogModel } from "../../models/Log";

class LogBufferService {
    private buffer: any[] = [];

    private readonly MAX_BUFFER_SIZE = 100; // Maximum number of logs to buffer before flushing
    private readonly FLUSH_INTERVAL = 500; // Flush interval in milliseconds

    private timer: NodeJS.Timeout | null = null;

    constructor() {
        this.startTimer();
    }

    public addLog(log: any) {
        this.buffer.push(log);

        if (this.buffer.length >= this.MAX_BUFFER_SIZE) {
            this.flush();
        }
    }

    private async flush() {
        if (this.buffer.length === 0) return;

        const LogsToInsert = [...this.buffer];

        this.buffer = [];

        try {
            await LogModel.insertMany(LogsToInsert, {ordered: false});
        } catch (error) {
            console.error("[BUFFER_ERROR]_AN_ERROR_OCCURRED_DURING_BULK_INSERT.");
        }

    }

    private startTimer() {
        this.timer = setInterval(() => {
            this.flush();
        },
            this.FLUSH_INTERVAL
        )
    }
}

export const logBufferService = new LogBufferService();
