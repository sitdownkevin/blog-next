/**
 * Gallery client auth uses the shared admin SIWE helpers.
 */
export {
  connectWallet,
  fetchAdminSession as fetchGallerySession,
  logoutAdminSession as logoutGallerySession,
  signInWithEthereum,
} from "@/lib/auth/client";
