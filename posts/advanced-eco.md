---
title: 高级计量经济学 笔记
date: 2021-04-05 10:55:00
tags: notes
---

# 第一章 导论

**现代经济学四个领域**

- 宏观经济学*
  - 研究总体经济变量（GDP、利率、汇率）

- 微观经济学*
- 金融经济学
- 计量经济学*

>  *经济学三门核心课程

**现代经济学研究四个步骤**

1. 收集数据和归纳经验*典型特征事实*
2. 构建经济理论或经济模型
3. 经济模型的经验验证
4. 应用

**现代经济学两个重要特征**

- 经济理论的数学建模

    - 1938：《财富理论的数学原理》
    
    - 边际革命（marginal revolution）是现代经济学的里程碑
    
    - 1874：一般均衡理论
    
    - 1994：博弈论

- 经济现象的实证分析（empirical analysis）

    - 1776：《国富论》，解释专业化分工的比较优势
    - 1933：《计量经济学》（Econometrica）创立为成为学科的标志
    - 两个*公理*
      1. 随机过程（stochastic process）
      2. 生成过程

**说明性实例**

...

# 第二章 一般回归模型和模型设定

*大写* 表示随机变量或随机向量

*小写* 表示实现值（realization）

## 条件概率分布

$(Y,X')'$

联合概率密度
$$
f_X(x)=\int_{-\infty}^{\infty}f_{XY}(x,y)dx
$$
给定 $X=x$, $Y$ 的条件概率密度（dependent relationship, predictive relationship）
$$
f_{Y\mid X}(y\mid x)=\frac{f_{XY}(xy)}{f_X(x)}
$$
**条件均值**（一阶条件矩）
$$
\begin{aligned}
E(Y\mid x)&\equiv E(Y\mid X=x)\\
&=\int_{-\infty}^{\infty} y f_{Y\mid X}(y\mid x)dy
\end{aligned}
$$
**条件方差**
$$
\begin{aligned}
\mathrm{var}(Y\mid x)&\equiv \mathrm{var}(Y\mid X=x)\\
&=\int_{-\infty}^{\infty}[y-E(Y\mid x)]^2 f_{Y\mid X}(y\mid x)dy\\
&=E(Y^2\mid x)-[E(Y\mid x)^2]
\end{aligned}
$$
**条件偏度**（conditional skewness）
$$
S(Y\mid x)\equiv \frac{E[(Y-E(Y\mid x))^3\mid x]}{[\mathrm{var}(Y\mid x)]^{\frac32}}
$$
**条件锋度**（conditional kurtosis）
$$
K(Y\mid x)\equiv \frac{E[(Y-E(Y\mid x))^4\mid x]}{[\mathrm{var}(Y\mid x)]^{2}}
$$
**条件 $\alpha$ - 分位数**（conditional $\alpha$-quantile）
$$
P(Y\le Q(X,\alpha)\mid X=x)=\alpha\in(0,1)
$$

## 条件均值与回归分析

**$E[Y\mid X]$ 被称为 $Y$ 对 $X$​ 的回归函数**



**重复期望法则（law of iterated expectations）**
$$
E[G(X,Y)]=E\{E[G(X,Y) \mid X]\}
$$
证明
$$
\begin{aligned}
E[G(X,Y)]&=\iint G(x,y)\cdot P(G(x,y))\cdot dxdy\\
&=\iint G(x,y)\cdot f_{XY}(x,y)\cdot dxdy\\
&=\iint G(x,y)\cdot f_{Y\mid X}(y\mid x) \cdot f_X(x)\cdot dxdy\\
&=\int[\int G(x,y)\cdot f_{Y\mid X}(y\mid x)\cdot dy]\cdot f_X(x)\cdot dx\\
&=\int[\int G(x,y)\cdot P(G(x,y) \mid x)\cdot dy]\cdot f_X(x)\cdot dx\\
&=\int E[G(X,Y)\mid X=x]\cdot f_X(x)\cdot dx\\
&=\int E[G(X,Y)\mid X=x]\cdot P(E[G(X,Y)\mid X=x])\cdot dx\\
&=E\{E[G(X,Y)\mid X]\}
\end{aligned}
$$


**均方误差**

对函数 $g(X)$ 
$$
\mathrm{MSE}(g)=E[Y-g(X)]^2
$$
条件均值是均方误差（目标函数）的最优解
$$
E(Y\mid X)=\arg\min_{g\in\mathbb{F}}\mathrm{MSE}(g)
$$

- $\mathbb{F}=\{g:\mathbb{R}^{k+1}\to \mathbb{R}\mid \int g^2(x)f_X(x)dx<\infty\}$

