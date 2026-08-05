/**
 * Prism languages used by post Markdown fences.
 * Core must load before component grammars register.
 */
import Prism from "prismjs";

if (typeof globalThis !== "undefined") {
  // Prevent client-side auto-highlight fighting SSR output
  (Prism as typeof Prism & { manual?: boolean }).manual = true;
}

import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-toml";
