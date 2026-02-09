import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

let isConnected = false;

const connectMongoDB = async () => {
    if (isConnected) return;

    try {
        const mongoDBInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        isConnected = true;

        console.log(
            `MongoDB connected | HOST: ${mongoDBInstance.connection.host}`
        );
    } catch (error) {
        console.error("MongoDB connection failed", error);
        throw error; // DO NOT exit process in serverless
    }
};

export { connectMongoDB };
