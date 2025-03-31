---
title: Launch an Ethereum Node
tags: Web3
create_date: 2025-01-10
update_date: 2025-03-31
---

## Content



## 需要的材料

- 硬件：一块容量够大的硬盘或 RAID（至少 4 T）

- 系统：macOS, Windows, Linux 均可
- 网络环境：国内宽带即可

## 思路

### 思路一：`Geth` + `Lighthouse`

`Geth` 作为执行层，`Lighthouse` 作为共识层

#### 流程

1. 先启动 Geth
2. 再启动 Lighthouse

#### 准备工作

1. 组一个 2t 的 RAID，挂载至 `/mnt/raid`

2. 创建数据文件夹

```shell
sudo mkdir /mnt/raid/ethereum-data
sudo mkdir /mnt/raid/lighthouse-data
```

3. 生成密钥

```shell
openssl rand -hex 32 | tr -d "\n" > /mnt/raid/ethereum/execution/jwtsecret
```

#### `Geth`

```shell
geth --mainnet --http --http.api eth,net,engine,admin --ipcpath=/mnt/raid/ethereum/execution/geth.ipc --datadir /mnt/raid/ethereum/execution --syncmode "snap"

geth --mainnet --datadir /mnt/raid/ethereum/execution --http --ipcpath /mnt/raid/ethereum/execution/geth.ipc
```



```shell
geth --datadir /mnt/raid/ethereum/execution \
     --syncmode "snap" \
     --http \
     --http.addr "0.0.0.0" \
     --http.port 8545 \
     --http.api "eth,net,web3" \
     --authrpc.addr "127.0.0.1" \
     --authrpc.port 8551 \
     --authrpc.jwtsecret /mnt/raid/ethereum/execution/jwtsecret \
     --cache 12288 \
     --maxpeers 100 \
     --history.transactions 0
```

#### `Lighthouse`

```shell
lighthouse beacon --network mainnet \
                  --datadir /mnt/lv-2t/lighthouse-data \
                  --checkpoint-sync-url https://mainnet-checkpoint-sync.stakely.io \
                  --execution-endpoint http://127.0.0.1:8551 \
                  --execution-jwt /mnt/lv-2t/ethereum-data/jwtsecret \
                  --port 7000 \
                  --discovery-port 7002
```

```shell
lighthouse beacon --network mainnet \
                  --datadir /mnt/lv-2t/lighthouse-data \
                  --checkpoint-sync-url https://sync.invis.tools \
                  --execution-endpoint http://127.0.0.1:8551 \
                  --execution-jwt /mnt/lv-2t/ethereum-data/jwtsecret \
                  --port 7000 \
                  --discovery-port 7002
```



### 思路二：`Erigon`

相比于 `Geth` + `Lighthouse` 的方式，`Erigon` 自带了 Beacon，不要安装额外的共识层。并且，`Erigon` 对于数据有很大的压缩，存储空间显著降低。

#### 流程

1. Clone `Erigon` Repo

   ```shell
   git clone --branch main --single-branch https://github.com/erigontech/erigon.git
   ```

2. Build the `Erigon`

   ```shell
   make erigon
   ```

3. Launch the `Erigon`

   ```shell
   ./build/bin/erigon --config ./config.toml
   ```

   `config.toml`

   ```toml
   "prune.mode" = "archive" 
   datadir = '/Volumes/Disk/data-archive'
   chain = "mainnet"
   http = true
   "http.addr"="0.0.0.0"
   "http.api" = ["eth","debug","net","web3","trace","txpool"]
   "torrent.download.rate" = "512mb"
   ```

   > `/Volumes/Disk/data-archive` 是我存放数据的目录

#### JSON-RPC

`Erigon` 在下载完数据后，支持直接通过 `rpcdaemon` 开启 JSON-RPC 服务

```shell
make rpcdaemon
```

> `rpcdaemon` 文档
> https://github.com/erigontech/erigon/blob/main/cmd/rpcdaemon/README.md

```shell
./build/bin/rpcdaemon --datadir=<your_data_dir> --txpool.api.addr=localhost:9090 --private.api.addr=localhost:9090 --http.api=eth,erigon,web3,net,debug,trace,txpool
```

```shell
./build/bin/rpcdaemon --datadir=/Volumes/Disk/data-archive --txpool.api.addr=localhost:9090 --private.api.addr=localhost:9090 --http.api=eth,erigon,web3,net,debug,trace,txpool
```

## JSON-RPC

### 参考

- [Geth vs Erigon: Deep dive into RPC methods on Ethereum clients
](https://docs.chainstack.com/docs/geth-vs-erigon-deep-dive-into-rpc-methods-on-ethereum-clients)

- [JSON-RPC Server
](https://geth.ethereum.org/docs/interacting-with-geth/rpc)

### 常用命令

````shell
curl --location --request GET 'http://localhost:8545/health' \
--header 'X-ERIGON-HEALTHCHECK: min_peer_count1' \
--header 'X-ERIGON-HEALTHCHECK: synced' \
--header 'X-ERIGON-HEALTHCHECK: max_seconds_behind600'
````

```shell
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
     http://127.0.0.1:8545
```

```shell
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
     http://192.168.2.11:8545
```

```shell
geth attach /mnt/lv-2t/ethereum-data/geth.ipc

eth.syncing
```