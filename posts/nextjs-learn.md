---
title: Next.js 学习笔记
date: 2020-04-28 14:51:00
tags: cs
---

**Client-Side Navigation**

Page transition happens using *JavaScript*, which is faster than the default navigation done by the browser. 

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

