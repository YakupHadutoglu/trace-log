import { MongoClient } from 'mongodb';
import env from './env';

export const mongoClient = new MongoClient(env.MONGO_URL || '');

export const connectMongo = async () => {
    try {
        await mongoClient.connect();
        console.log('Connected to MongoDb')
    } catch (error) {
        console.error('Failed to connect to MongoDB', `error = ${error}`);
    }
}
