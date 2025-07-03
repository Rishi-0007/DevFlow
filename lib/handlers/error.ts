import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { RequestError, ValidationError } from "../http-errors";
import logger from "../logger";

export type ResponseType = "api" | "server";

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]>
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

const handleError = (error: unknown, responseType: ResponseType = "server") => {
  // 1️⃣ RequestError
  if (error instanceof RequestError) {
    const logMsg = `${responseType.toUpperCase()} Error: ${error.message}`;
    logger.error({ message: logMsg, err: error });
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  // 2️⃣ Zod validation
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );
    const logMsg = `Validation Error: ${validationError.message}`;
    logger.error({ message: logMsg, err: error });
    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  // 3️⃣ Generic JS Error
  if (error instanceof Error) {
    logger.error({ message: error.message, err: error });
    return formatResponse(responseType, 500, error.message);
  }

  // 4️⃣ Anything else
  const fallbackMsg = "An unexpected error occurred";
  logger.error({ message: fallbackMsg, err: error });
  return formatResponse(responseType, 500, fallbackMsg);
};

export default handleError;
