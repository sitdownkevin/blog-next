---
title: Homebrew
---


## Brew

> 清华大学开源软件镜像站
> https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/

### 更新所有 Cask

```shell
brew list --cask | xargs -I {} brew upgrade --cask {}
```

官方命令

```shell
brew upgrade --greedy
```

### 清理

```shell
brew cleanup --prune=all
```

## Scoop

### 清理

```shell
scoop cleanup *
```

```shell
scoop cache rm *
```

## Choco

```shell
choco upgrade all -y
```

