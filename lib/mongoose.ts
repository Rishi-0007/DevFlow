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
    // 🔧 Set global options before connecting
    mongoose.set("bufferCommands", false);
    mongoose.set("bufferTimeoutMS", 30000); // 30 seconds (or 0 to disable)

    const options = {
      dbName: "devflow",
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 50,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true,
      connectTimeoutMS: 30000,
    };

    logger.info("Creating new mongoose connection");

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => {
        logger.info("✅ Successfully connected to MongoDB");
        return mongoose;
      })
      .catch((error) => {
        logger.error("❌ Failed to connect to MongoDB", {
          message: error.message,
        });
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  mongoose.connection.on("connected", () => {
    logger.info("Mongoose connected to DB");
  });

  mongoose.connection.on("error", (err) => {
    logger.error("Mongoose connection error", { message: err.message });
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("Mongoose disconnected from DB");
    cached.conn = null;
    cached.promise = null;
  });

  return cached.conn;
};

export default dbConnect;
