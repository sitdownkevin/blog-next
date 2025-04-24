import { visit } from 'unist-util-visit';
import { Element, Node } from 'hast';

// Custom rehype plugin to wrap code blocks with a div for frontend handling
export function rehypeCodeBlocks() {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {
      // Find <pre> elements that contain a <code> child with a language class
      if (
        node.tagName === 'pre' &&
        node.children.length > 0 &&
        node.children[0].type === 'element' &&
        node.children[0].tagName === 'code' &&
        node.children[0].properties &&
        typeof node.children[0].properties.className === 'object' &&
        Array.isArray(node.children[0].properties.className) &&
        node.children[0].properties.className.some((name: string) => name.startsWith('language-'))
      ) {
        // Wrap the <pre> element in a div with a data attribute
        const wrapperDiv: Element = {
          type: 'element',
          tagName: 'div',
          properties: {
            'data-code-block': true, // Add a data attribute to identify this block
            className: ['relative', 'group'] // Add necessary classes for styling
          },
          children: [node], // Place the original <pre> node inside the new div
        };

        // Replace the original <pre> node with the new wrapper div
        Object.assign(node, wrapperDiv);
      }
    });
  };
}