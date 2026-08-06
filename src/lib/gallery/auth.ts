/**
 * Gallery auth re-exports the shared admin SIWE session.
 * Kept for backward-compatible imports from gallery API routes.
 */
export {
  AuthError,
  clearSession,
  createNonce,
  createSession,
  getSessionAddress,
  requireAdminSession,
  verifySiweLogin,
  type VerifySiweResult,
} from "@/lib/auth/session";
