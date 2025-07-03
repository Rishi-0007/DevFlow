// Avoid importing pino in edge/RSC
import type { Logger } from "pino";

const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProduction = process.env.NODE_ENV === "production";

let logger:
  | Logger
  | {
      info: typeof console.log;
      warn: typeof console.warn;
      error: typeof console.error;
      debug: typeof console.debug;
    };

if (!isEdge && typeof window === "undefined") {
  try {
    const pino = (await import("pino")).default;

    // Configuration for production
    const prodConfig = {
      level: process.env.LOG_LEVEL || "info",
      formatters: {
        level: (label: string) => ({ level: label.toUpperCase() }),
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    };

    // Configuration for development
    const devConfig = {
      ...prodConfig,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname",
          translateTime: "SYS:standard",
          // Disable worker threads in development
          singleLine: true,
        },
      },
    };

    logger = pino(isProduction ? prodConfig : devConfig);
  } catch (error) {
    console.error("Failed to initialize pino logger:", error);
    // Fallback to console logger if pino fails
    logger = {
      info: console.log,
      warn: console.warn,
      error: console.error,
      debug: console.debug,
    };
  }
} else {
  // Dummy logger fallback for Edge / RSC
  logger = {
    info: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
  };
}

export default logger;
