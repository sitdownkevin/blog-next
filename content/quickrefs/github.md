---
title: Github
---

## Github Desktop

Linux: https://github.com/shiftkey/desktop

macOS&Windows: https://desktop.github.com/

## 配置 Git 邮箱和用户名

```shell
git config --global user.name "<user_name>"
git config --global user.email "<user_email>"
```

## 常规操作

### 初始化 | 添加文件 | 提交文件

```{shell}
# 仓库初始化
git init

# 添加文件
git add <file_name>
git add *

# 提交文件
git commit -m "<commit_message>"
```

### 查看信息

```shell
# 查看状态
git status

# 查看不同
git diff <file_name>
```

#### 分支管理

```shell
# 查看分支
git branch

# 创建分支
git branch <branch_name>

# 切换分支
git checkout <branch_name>

# 删除分支
git branch -d <branch_name>

# 合并分支
git merge
```

## 远程仓库（Github）

### SSH 连接

```shell
# 创建 SSH Key
ssh-keygen -t rsa -C "<user_email>"
```

> 把这个公钥设置到Github中

#### 推送（Push）到远程仓库

```shell
# 添加远程仓库
git remote add origin git@github.com:<user_name>/<repo_name>.git

# 推送到远程仓库
git push -u origin master

# (只有第一次推送需要参数 -u)
git push origin master
```

#### 从远程仓库拉取（Pull）
```shell
# 格式
git pull <远程主机名>  <远程分支名>:<本地分支名>

# 示例
git pull origin master:master
git pull origin master # 本地分支名可省略
```

### 更改远程仓库

> 注意是用的SSH还是HTTP协议，如果是ssh需要在Github添加公钥，如果是http只需要输入账号密码登录，我喜欢用SSH

```shell
git remote set-url origin git@github.com:<user_name>/<repo_name>.git
```

### 删除远程库

```shell
# 查看远程库信息
git remote -v

# 删除远程库
git remote rm <origin>
```

## 其他

### 配置代理

```shell
# http
git config --global http.proxy 'http://127.0.0.1:7890'

# https
git config --global https.proxy 'http://127.0.0.1:7890'

# 查看配置
git config --list
```

### 种族主义和奴隶制度

```shell
git branch -M main
```

> git默认分支的名称是master。master涉嫌了种族歧视，因此Github的默认分支名为main。在push到Github之前需要将本地master分支的名称改为main。
