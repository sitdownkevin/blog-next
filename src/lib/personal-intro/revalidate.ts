import { revalidateTag } from "next/cache";

export function revalidatePersonalIntro(): void {
  revalidateTag("personal-intro", "max");
}
