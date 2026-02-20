/**
 * Structured logging utility
 * Provides environment-aware logging with JSON format for production
 */

type LogLevel = "error" | "warn" | "info" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private isDevelopment: boolean;
  private minLevel: LogLevel;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === "development";
    // In production, only log errors and warnings by default
    this.minLevel = this.isDevelopment ? "debug" : "warn";
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ["debug", "info", "warn", "error"];
    const currentLevelIndex = levels.indexOf(level);
    const minLevelIndex = levels.indexOf(this.minLevel);
    return currentLevelIndex >= minLevelIndex;
  }

  private formatEntry(entry: LogEntry): string {
    if (this.isDevelopment) {
      // Human-readable format for development
      const parts = [`[${entry.level.toUpperCase()}]`, entry.message];
      if (entry.context) {
        parts.push(JSON.stringify(entry.context, null, 2));
      }
      if (entry.error) {
        parts.push(`\nError: ${entry.error.message}`);
        if (entry.error.stack) {
          parts.push(entry.error.stack);
        }
      }
      return parts.join(" ");
    } else {
      // JSON format for production (easier to parse by log aggregation tools)
      return JSON.stringify(entry);
    }
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    const formatted = this.formatEntry(entry);

    switch (level) {
      case "error":
        console.error(formatted);
        break;
      case "warn":
        console.warn(formatted);
        break;
      case "info":
        console.info(formatted);
        break;
      case "debug":
        console.log(formatted);
        break;
    }
  }

  /**
   * Log error messages
   */
  error(
    message: string,
    error?: Error | unknown,
    context?: Record<string, any>,
  ) {
    const entry: LogEntry = {
      level: "error",
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    if (error instanceof Error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    } else if (error) {
      entry.error = {
        name: "Unknown",
        message: String(error),
      };
    }

    const formatted = this.formatEntry(entry);
    console.error(formatted);
  }

  /**
   * Log warning messages
   */
  warn(message: string, context?: Record<string, any>) {
    this.log("warn", message, context);
  }

  /**
   * Log info messages
   */
  info(message: string, context?: Record<string, any>) {
    this.log("info", message, context);
  }

  /**
   * Log debug messages (only in development)
   */
  debug(message: string, context?: Record<string, any>) {
    this.log("debug", message, context);
  }
}

// Export singleton instance
export const logger = new Logger();
