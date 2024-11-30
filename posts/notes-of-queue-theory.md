---
title: 排队论
tags: MATH
create_date: 2024-11-30
update_date: 2024-11-30
---

##### Contents

## 基本概念

### 基本要素

```mermaid
graph LR
    A[顾客]-->B[排队结构]
    B-->C[服务机构]
    C-->D[离去]
```

1. 到达时间的分布和服务时间的分布
2. 服务机构的设置

### 排队现象的原因

要求服务的顾客数量超过了服务机构的数量。到达的顾客不能立刻得到服务。两个根本原因：

1. 服务机构的限制
2. 顾客到达和服务时间是不确定的

## 常见分布

时间间隔服从负指数分布，到达服从 Poisson 分布

### Poisson 分布

$$
P_n(t_1,t_2)=P(N(t_2)-N(t_1))=n
$$

$$
P\{ N(t)=n \}=\frac{(\lambda t)^n}{n!} e^{-\lambda t},n=1,2,\dots,N
$$

- 顾客到达数相互独立

- 顾客到达是平稳的：$P_1(t,t+\Delta t)=\lambda \Delta t+ o(\Delta t)$

- 在 $[t,t+\Delta t]$ 有 2 个或 2 个以上顾客到达的概率极小

### 负指数分布

$$
P\{T\gt t+s\mid T\gt s\} = P\{ T\gt t\}
$$

Probability density function

$$
f_{\lambda}(t)=\begin{cases}
\lambda e^{-\lambda t}&,t\geq 0\\
0&,t\lt 0
\end{cases}
$$

Cumulative distribution function

$$
F_{\lambda}(t)=\begin{cases}
1-e^{-\lambda t}&,t\geq 0\\
0&,t\lt 0
\end{cases}
$$

- 无记忆性

### k 阶爱尔朗分布

Probability density function

$$
f_{k}(t)=\begin{cases}
\frac{k\mu (k\mu t)^{k-1}}{(k-1)!}e^{-k\mu t}&,t\geq 0\\
0&,t\lt 0
\end{cases}
$$

- 当 $k\geq 30$ 时，趋近于正态分布

- 当 $k\to\infty$ 时，方差为 $0$

## 常见排队模型

### M/M/1

- $\lambda$

- $\mu$

- $\rho=\frac{\lambda}{\mu}$

- $P_0=1-\rho$

- $P_n=\rho^n P_0$

| $L_s=\frac{\rho}{1-\rho}=\frac{\lambda}{\mu-\lambda}$ | $ L_q=\frac{\rho^2}{1-\rho}=\frac{\lambda^2}{(\mu-\lambda)\mu}$ |
| ----------------------------------------------------- | --------------------------------------------------------------- |
| $W_s=\frac{1}{\mu-\lambda}$                           | $W_q=\frac{\lambda}{(\mu-\lambda)\mu}$                          |

### M/M/1/N

- $\lambda$

- $\mu$

- $n$

- $\rho=\frac{\lambda}{\mu}$

当 $\rho=1$

- $P_n=\frac{1}{N+1},n=0,1,2,\dots,N$

- $\lambda_e=\mu(1-P_0)$

| $L_s=\frac N2$              | $L_q=L_s- \frac{\lambda_e}{\mu}$ |
| --------------------------- | -------------------------------- |
| $W_s=\frac{L_s}{\lambda_e}$ | $W_q=W_s-\frac{1}{\mu}$          |

当 $\rho\neq 1$

- $P_0=\frac{1-\rho}{1-\rho^{N+1}}$

- $P_n=\rho^n P_0,n=1,2,\dots,N$

- $\lambda_e=\mu(1-P_0)$

| $L_s=\frac{\rho}{1-\rho} - \frac{(N+1)\rho^{N+1}}{1-\rho^{N+1}}$ | $L_q=L_s-\frac{\lambda_e}{\mu}$ |
| ---------------------------------------------------------------- | ------------------------------- |
| $W_s=\frac{L_s}{\lambda_e}$                                      | $W_q=W_s-\frac{1}{\mu} $        |

### M/M/c

> 和 $\frac1c$ 个 M/M/1 不同

### M/G/1

[P-K 公式](https://en.wikipedia.org/wiki/Pollaczek%E2%80%93Khinchine_formula)（派拉契克-辛钦公式）

| $L_s=\rho+\frac{\rho^2+\lambda^2 \mathrm{Var}(T)}{2(1-\rho)}$ | $L_q=L_s-\rho$            |
| ------------------------------------------------------------- | ------------------------- |
| $W_s=\frac{L_s}{\lambda}$                                     | $W_q=\frac{L_q}{\lambda}$ |
