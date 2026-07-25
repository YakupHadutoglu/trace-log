// import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import env from './env';

// export const mongoClient = new MongoClient(env.MONGO_URL || '');

export const connectMongo = async () => {
    try {
        await mongoose.connect(env.MONGO_URL || '');
        console.log('Connected to MongoDb')
    } catch (error) {
        console.error('Failed to connect to MongoDB', `error = ${error}`);
        process.exit(1); // Exit the process with an error code
    }
}
