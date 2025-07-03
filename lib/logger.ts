type LogLevel = "error" | "warn" | "info" | "debug";

interface LogMessage {
  message: string;
  [key: string]: any;
}

const logLevels: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLogLevel: LogLevel =
  (process.env.LOG_LEVEL as LogLevel) ||
  (process.env.NODE_ENV === "production" ? "info" : "debug");

class BasicLogger {
  private shouldLog(level: LogLevel): boolean {
    return logLevels[level] <= logLevels[currentLogLevel];
  }

  error(message: string | LogMessage, ...args: any[]) {
    if (!this.shouldLog("error")) return;

    if (typeof message === "object") {
      const { message: msg, ...rest } = message;
      console.error(`[ERROR] ${msg}`, rest, ...args);
    } else {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  warn(message: string | LogMessage, ...args: any[]) {
    if (!this.shouldLog("warn")) return;

    if (typeof message === "object") {
      const { message: msg, ...rest } = message;
      console.warn(`[WARN] ${msg}`, rest, ...args);
    } else {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  info(message: string | LogMessage, ...args: any[]) {
    if (!this.shouldLog("info")) return;

    if (typeof message === "object") {
      const { message: msg, ...rest } = message;
      console.info(`[INFO] ${msg}`, rest, ...args);
    } else {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  debug(message: string | LogMessage, ...args: any[]) {
    if (!this.shouldLog("debug")) return;

    if (typeof message === "object") {
      const { message: msg, ...rest } = message;
      console.debug(`[DEBUG] ${msg}`, rest, ...args);
    } else {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

// Singleton logger instance
const logger = new BasicLogger();

export default logger;
