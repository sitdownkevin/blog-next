---
title: Notes of Frontend
tags: Coding
create_date: null
update_date: 2024-11-30
---

## Some Concepts

### Declarative vs imperative programming

> https://nextjs.org/learn/foundations/from-javascript-to-react/updating-ui-with-javascript

Which of the following statements is more declarative?

A. "Knit the dough, roll the dough, add tomato sauce, add cheese, add ham, add pineapple, bake at 200 degrees celsius in a stone oven for...”

**B. “A Hawaiian pizza please.”**

### What is JSX?

JSX is a syntax extension for JavaScript that allows you to describe your UI in a familiar _HTML-like_ syntax. The nice thing about JSX is that apart from following [three JSX rules](https://beta.reactjs.org/learn/writing-markup-with-jsx#the-rules-of-jsx), you don’t need to learn any new symbols or syntax outside of HTML and JavaScript.

Note that browsers don’t understand JSX out of the box, so you’ll need a JavaScript compiler, such as a [Babel](https://babeljs.io/), to transform your JSX code into regular JavaScript.

### From Development to Production

- Compiling

- Minifying

- Bundling

  (webpack)

- Code Splitting

### Difference between `--save` and `--save-dev`

When installing a package that will be bundled into your production bundle, you should use `npm install --save`. If you're installing a package for development purposes (e.g. a linter, testing libraries, etc.) then you should use `npm install --save-dev`.

### Next.js

**Client-Side Navigation**

Page transition happens using _JavaScript_, which is faster than the default navigation done by the browser.

**Code Splitting and Prefetching**

Next.js odes code splitting automatically.

**Pre-Rendering**

Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript.

- Static Generation (at build time)
- Server-Side Rendering (on each request)

**Client-Side Rendering**

Dashboard

---

`getStaticProps()`

`getServerSideProps()`

`getStaticPaths()`

**Parse the metadata in each markdown file**

- `gray-matter`

**Render Markdown**

- `remark`
- `remark-html`

**Format the Date**

- `date-fns`

## ESM and CJS

ESM

- `import`
- `"type": "module"`
- `.mjs`

CJS

- `dynamic import()`
- `require`
- `.cjs`
