---
title: Homebrew
---

> 清华大学开源软件镜像站
> https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/

## 更新所有 Cask

```shellsession
brew list --cask | xargs -I {} brew upgrade --cask {}
```

