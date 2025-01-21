---
title: Launch an Ethereum Node
tags: Web3
create_date: 2025-01-10
update_date: 2025-01-21
---

### 流程

1. 先启动 Geth
2. 再启动 Lighthouse

### 准备工作

1. 组一个 2t 的 RAID，挂载至 `/mnt/lv-2t`

2. 创建数据文件夹

```shell
sudo mkdir /mnt/lv-2t/ethereum-data
sudo mkdir /mnt/lv-2t/lighthouse-data
```

3. 生成密钥

```shell
openssl rand -hex 32 | tr -d "\n" > /mnt/lv-2t/ethereum-data/jwtsecret
```


### Geth

```shell
geth --datadir /mnt/lv-2t/ethereum-data \
     --syncmode "snap" \
     --http \
     --http.addr "0.0.0.0" \
     --http.port 8545 \
     --http.api "eth,net,web3" \
     --authrpc.addr "127.0.0.1" \
     --authrpc.port 8551 \
     --authrpc.jwtsecret /mnt/lv-2t/ethereum-data/jwtsecret \
     --cache 12288 \
     --maxpeers 100 \
     --history.transactions 0

```

### Lighthouse

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

### 测试

```shell
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
     http://localhost:8545

```

```shell
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
     http://192.168.2.11:8545

```


```shell
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
     https://mainnet.infura.io/v3/3f64d2d582274b35b75df8d5b8ee42c6

```

```shell
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0xabd805c8da8f90e0f3104b3a7018aeec97cdcf5fc9b546918a5a6bc529de7933"],"id":1}' -H "Content-Type: application/json" http://192.168.2.11:8545
```





```shell
geth attach /mnt/lv-2t/ethereum-data/geth.ipc

eth.syncing
```

监听网卡

```
nload wlp8s0
```
