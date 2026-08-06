import { revalidateTag } from "next/cache";

export function revalidateResume(): void {
  revalidateTag("resume", "max");
}
