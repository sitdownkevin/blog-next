import { visit } from 'unist-util-visit';

export function rehypeMermaid() {
    return (tree) => {
        visit(tree, 'element', (node) => {
            // 处理 Mermaid 图表
            if (node.tagName === 'pre') {
                const code = node.children[0];
                if (code && code.tagName === 'code' && 
                    code.properties.className && 
                    code.properties.className.includes('language-mermaid')) {
                    const value = code.children[0].value;
                    node.tagName = 'div';
                    node.properties = { 
                        className: ['mermaid', 'my-8', 'flex', 'justify-center'] 
                    };
                    node.children = [{ type: 'text', value: value.trim() }];
                }
            }
        });
    };
}
