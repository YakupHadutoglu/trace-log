import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
    projectId: string;
    level: 'info' | 'warn' | 'error' | 'fatal' | 'debug';
    message: string;
    metadata: any;
    timestamp: Date;
}

const LogSchema: Schema = new Schema({
    projectId: {
        type: String,
        required: true,
        index: true
    },
    level: {
        type: String,
        required: true,
        enum: ['info', 'warn', 'error', 'fatal', 'debug']
    },
    message: {
        type: String,
        required: true
    },
    metadata: {
        type: Schema.Types.Mixed,
        required: true
    },
    timestamp: {
        type: Date,
        required: true

    }
}, {
    timeseries: {
        timeField: 'timestamp',
        metaField: 'projectId',
        granularity: 'seconds'
    }
});

export const LogModel = mongoose.model<ILog>('Log', LogSchema);
