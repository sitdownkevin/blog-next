// KaTeX CSS 内容（精简版，只包含最基本的样式）
export const KATEX_CSS = `
.katex {
    font: normal 1.21em KaTeX_Main,Times New Roman,serif;
    line-height: 1.2;
    text-indent: 0;
    text-rendering: auto;
}
.katex-display {
    display: block;
    margin: 1em 0;
    text-align: center;
}
.katex-html {
    display: inline-block;
}
.katex .base {
    position: relative;
}
.katex .mathit {
    font-family: KaTeX_Math;
    font-style: italic;
}
.katex .mord {
    font-family: KaTeX_Main;
}
.katex .mord.text {
    font-family: KaTeX_Main;
}
.katex .msupsub {
    text-align: left;
}
.katex .mfrac {
    display: inline-block;
    text-align: center;
}
.katex .mfrac > span {
    display: block;
}
.katex .sqrt {
    display: inline-block;
}
.katex .sqrt > .root {
    margin-left: 0.27777778em;
    margin-right: -0.55555556em;
}
`;
