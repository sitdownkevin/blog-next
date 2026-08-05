import { redirect } from "next/navigation";

// Intentionally blocking: this segment only issues a redirect.
export const instant = false;

export default function Page() {
  redirect("/tools/advanced_search/utd");
}
