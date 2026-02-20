import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { logger } from "@/shared/utils/logger";

/**
 * Standard error response format
 */
interface ErrorResponse {
  error: string;
  code?: string;
  details?: any;
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
  message: string,
  status: number,
  code?: string,
  details?: any,
): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      error: message,
      code,
      details,
    },
    { status },
  );
}

/**
 * Handle Zod validation errors
 */
export function handleValidationError(
  error: ZodError,
): NextResponse<ErrorResponse> {
  const firstError = error.issues[0];
  const message = firstError?.message || "验证失败";

  logger.warn("Validation error", {
    errors: error.issues,
  });

  return createErrorResponse(message, 400, "VALIDATION_ERROR", error.issues);
}

/**
 * Handle generic errors with logging
 */
export function handleError(
  error: unknown,
  defaultMessage: string = "Internal server error",
): NextResponse<ErrorResponse> {
  if (error instanceof ZodError) {
    return handleValidationError(error);
  }

  logger.error(defaultMessage, error);

  return createErrorResponse(defaultMessage, 500, "INTERNAL_ERROR");
}

/**
 * Common error responses
 */
export const ErrorResponses = {
  unauthorized: () =>
    createErrorResponse("未授权访问，请先登录", 401, "UNAUTHORIZED"),
  forbidden: () => createErrorResponse("无权限执行此操作", 403, "FORBIDDEN"),
  notFound: (resource: string = "资源") =>
    createErrorResponse(`${resource}不存在`, 404, "NOT_FOUND"),
  badRequest: (message: string) =>
    createErrorResponse(message, 400, "BAD_REQUEST"),
  internalError: () =>
    createErrorResponse("服务器内部错误", 500, "INTERNAL_ERROR"),
};
