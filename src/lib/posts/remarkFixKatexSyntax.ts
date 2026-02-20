import { visit } from "unist-util-visit";

/**
 * 修复 KaTeX 中的常见语法问题
 * - 将显示模式中的简单换行 \\ 转换为 aligned 环境
 */
export function remarkFixKatexSyntax() {
  return (tree: any) => {
    visit(tree, "math", (node: any) => {
      if (node.meta !== "inline") {
        // 1. 修复显示模式中的简单换行
        if (
          /(?<!\\begin\{.*\}[\s\S]*?)\\\\(?![\s\S]*?\\end\{)/.test(node.value)
        ) {
          const isInEnvironment =
            /\\begin\{(aligned|align|gather|gathered|cases|array)\}/.test(
              node.value,
            );

          if (!isInEnvironment) {
            // 计算等号对齐
            if (/=/.test(node.value)) {
              // 将每行在等号处对齐
              const lines = node.value
                .split(/\\\\/)
                .map((line: string) =>
                  line.trim().replace(/(.+)(=.+)/, "$1 &$2"),
                );
              node.value = `\\begin{aligned}\n${lines.join(" \\\\\n")}\n\\end{aligned}`;
            } else {
              // 不需要对齐的情况使用 gathered
              node.value = `\\begin{gathered}\n${node.value}\n\\end{gathered}`;
            }
          }
        }

        // 2. 修复其他常见问题
        // 例如处理矩阵、表格等
      }
    });
  };
}
