---
title: Ubuntu Server 折腾日志
tags: FUN
create_date: 2025-04-12
update_date: 2025-04-12
---

> 记录 Ubuntu Server 的一些折腾

## 创建 RAID 0

首先查看磁盘信息

```shell
fdisk -l
```

假设有三块磁盘 `/dev/sda` `/dev/sdb` 和 `dev/sdc`

使用 `mdadm` 命令创建 RAID 0

```shell
mdadm --create /dev/md0 --level=0 --raid-devices=3 /dev/sda /dev/sdb /dev/sdc
```

其中 `/dev/md0` 是 RAID 0 的设备名，`--level=0` 表示 RAID 0，`--raid-devices=3` 表示有 3 个设备参与 RAID 0

验证 RAID 状态

```shell
sudo mdadm --detail /dev/md0
```

创建文件系统

```shell
mkfs.ext4 /dev/md0
```

挂载 RAID 0

```shell
mkdir /mnt/raid0
mount /dev/md0 /mnt/raid0
```

持久化配置

```shell
sudo mdadm --detail --scan | sudo tee -a /etc/mdadm/mdadm.conf # 持久化配置
sudo update-initramfs -u # 重新生成 initramfs
echo '/dev/md0 /mnt/raid0 ext4 defaults,nofail 0 0' | sudo tee -a /etc/fstab # 持久化挂载配置
```

- `/etc/mdadm/mdadm.conf` 用于配置 RAID 信息
- `/etc/fstab` 用于配置自动挂载信息
- `update-initramfs -u` 用于重新生成 `initramfs`，它是 Linux 内核启动时加载的文件系统映像，包含了系统启动所需的驱动程序和文件系统信息

## 1Panel

### Docker

注意事项

1. 由于安装 Ubuntu Server 的时候使用了 snap 包管理器，由其安装的 Docker 版本在 1Panel 下存在问题，需要使用 `apt` 安装 Docker

2. 新版本的 1Panel 要求 `docker-compose`，而 `apt` 安装的是 `docker compose`，需要手动软链接

```shell
sudo ln -s /usr/libexec/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose
```
