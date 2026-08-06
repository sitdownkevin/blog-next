import { revalidateTag } from "next/cache";
import { encrypt } from "@/lib/posts/crypto";

export function revalidatePosts(slug?: string): void {
  revalidateTag("posts", "max");
  if (slug) {
    revalidateTag(`post:${encrypt(slug)}`, "max");
  }
}
