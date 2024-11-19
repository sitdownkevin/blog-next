---
title: Clash
---

## Clash Verge Rev

```yaml
# Merge Template for clash verge
# The `Merge` format used to enhance profile

prepend-rules:
  - DOMAIN-SUFFIX,wochirou.com,DIRECT
  - DOMAIN-SUFFIX,burn.hair,DIRECT
  - DOMAIN-SUFFIX,js.design,DIRECT
  - DOMAIN-SUFFIX,edu.cn,DIRECT
  - DOMAIN-SUFFIX,easyscholar.cc,DIRECT,
  - DOMAIN-SUFFIX,heywhale.com,DIRECT,
  - DOMAIN-SUFFIX,wolai.com,DIRECT,
  - DOMAIN-SUFFIX,cotticoffee.com,DIRECT,
  - DOMAIN-SUFFIX,chibaidao.com,DIRECT,
```

## Clash for Windows

`JavaScript` 模式

```javascript
module.exports.parse = async (
  { content, name, url }, 
  { axios, yaml, notify }
) => {
  const extra = { 
    rules: [
      'DOMAIN-SUFFIX,easyscholar.cc,DIRECT',
      'DOMAIN-SUFFIX,heywhale.com,DIRECT',
      'DOMAIN-SUFFIX,wolai.com,DIRECT',
      'DOMAIN-SUFFIX,sitdownkevin.xyz,DIRECT',
      'DOMAIN-SUFFIX,cotticoffee.com,DIRECT',
      'DOMAIN-SUFFIX,chibaidao.com,DIRECT',
      ...content.rules,
    ],
  }
  return { ...content, ...extra }
}
```