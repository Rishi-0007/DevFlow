import mongoose, { Mongoose } from "mongoose";

import logger from "./logger";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.debug("Using existing mongoose connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      dbName: "devflow",
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 50, // Maximum number of connections in the pool
      minPoolSize: 5, // Minimum number of connections in the pool
      retryWrites: true,
      retryReads: true,
      connectTimeoutMS: 30000, // 30 seconds
    };

    logger.info("Creating new mongoose connection");
    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => {
        logger.info("Successfully connected to MongoDB");
        return mongoose;
      })
      .catch((error) => {
        logger.error("Failed to connect to MongoDB", error);
        // Reset the promise to allow retries
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, clear the cache to allow retry
    cached.promise = null;
    throw error;
  }

  // Setup event listeners for the connection
  mongoose.connection.on("connected", () => {
    logger.info("Mongoose connected to DB");
  });

  mongoose.connection.on("error", (err) => {
    logger.error("Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("Mongoose disconnected from DB");
    // Reset connection cache to force reconnection
    cached.conn = null;
    cached.promise = null;
  });

  return cached.conn;
};

export default dbConnect;
