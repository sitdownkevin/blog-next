---
title: Cournot and Starkelberg Model
tags: MATH
date: 20241023
---

[Python 代码](/jupyter/cournot-model-and-starkelberg-model.html)

### 古诺模型

> Cournot duopoly model
>
> - 古诺模型是一个静态博弈，局中人同时决策，即博弈只有一阶段
>
> - 甲、乙互不知道对方的先前产量
>
> - 甲、乙地位平等

商品的价格
$$
P=a-bQ=8-(q_1+q_2)
$$

- $q_1$ 和 $q_2$ 分别是甲、乙的产量

- $P=a-bQ$，设 $a=8,b=1$

生产者的利润
$$
\pi_i=q_i P-q_ic_i
$$

- $c_1$ 和 $c_2$ 分别是甲、乙的生产成本，设 $c_1=c_2=c$

甲、乙的利润 $\pi_1$ 和 $\pi_2$ 为
$$
\begin{cases}
\pi_1=q_1 [8-(q_1+q_2)]-q_1c\rightarrow q_18-q_1^2-q_1q_2-q_1c\\
\pi_2=q_2 [8-(q_1+q_2)]-q_2c\rightarrow q_28-q_2^2-q_1q_2-q_2c\\
\end{cases}
$$
寻找**纳什均衡**
$$
\frac{\partial \pi_1}{q_1}=0,\frac{\partial\pi_2}{q_2}=0\\
\downarrow\\
\begin{cases}
8-2q_1-q_2-c=0\\
8-2q_2-q_1-c=0
\end{cases}\\
\downarrow\\
\begin{cases}
q_1=\frac{8-c}{3}\\
q_2=\frac{8-c}{3}
\end{cases}
$$
因此，$(q_1^*,q_2^*)=(\frac{8-c}{3},\frac{8-c}{3})$ 是一个纳什均衡。

在此纳什均衡上，求甲、乙的利润
$$
\pi_1=\pi_2=\frac{(8-c)^2}{9}
$$
甲、乙的总利润为
$$
\pi=\pi_1+\pi_2=\frac{2(8-c)^2}{9}
$$

---

不考虑博弈的情况下，甲、乙的总利润为
$$
\pi_o=Q P(Q)-Qc=Q(8-Q)-Qc=-Q^2+Q(8-c)\\
\downarrow\\
\frac{\partial \pi_o}{\partial Q}=0\rightarrow -2Q+(8-c)=0\rightarrow Q=\frac{8-c}{2}\\
\downarrow\\
\pi_o^*=\frac{(8-c)^2}{4}
$$
不难发现，从两个厂商总体利益最大化角度进行统一的产量选择时，总产量较小，而总利润却较高。

---

因此，甲、乙应该选择合作。但是在缺乏强制性协议保障的情况下，由于最优决策不是纳什均衡，因此两个厂商都会悄悄增产。

### 斯塔克尔伯格模型

> Stackelberg model
>
> - 动态博弈：两个厂商并不是同时决策，而是一方先决策，另一方根据对方的决策，再作出决策，即博弈有两个阶段
> - 后做决策的博弈方，知道先做决策的博弈方的决策
> - 两个厂商中，一个寡头厂商是处于支配地位的领导者，另一个是寡头厂商的追随者，即两个厂商在市场上是不对称的竞争。

甲、乙的利润 $\pi_1$ 和 $\pi_2$ 为
$$
\begin{cases}
\pi_1=q_1 [8-(q_1+q_2)]-q_1c\rightarrow q_18-q_1^2-q_1q_2-q_1c\\
\pi_2=q_2 [8-(q_1+q_2)]-q_2c\rightarrow q_28-q_2^2-q_1q_2-q_2c\\
\end{cases}
$$
用**逆推归纳法**求子博弈完美纳什均衡

先分析乙的决策，此时甲的决策 $q_1$ 已经决定且乙知道。对于乙来说，要在 $q_1$ 的情况下决定 $q_2$ 使得 $\pi_2$ 最大化
$$
\frac{\partial \pi_2}{\partial q_2}=8-2q_2-q_1-c=0\\
\downarrow\\
q_2^*=\frac{8-q_1-c}{2}
$$
甲知道乙的决策思路，在决定 $q_1$ 时就知道 $q_2^*$ 
$$
\pi_1=q_18-q_1^2-q_1\frac{8-q_1-c}{2}-q_1c=-\frac12q_1^2+(4-\frac c2)q_1
$$
这说明，甲身为领导者（先做决策的一方），在考虑乙的反应后，可以控制自己的收益 $\pi_1$；而乙身为追随者，需要根据领导者的决策而决定自己的决策。在斯塔克尔伯格模型中，领导者得决策不需要自己的反应函数
$$
\frac{\partial \pi_1}{\partial q_1}=-q_1+4-\frac c2=0\\
\downarrow\\
q_1^*=4-\frac c2
$$
得到 $q_1^*$ 即可推出
$$
q_2^*=2-\frac{c}{4}
$$
此时的市场总共计量
$$
Q=q_1^*+q_2^*=6-\frac{3}{4}c
$$
市场价格 
$$
P=8-Q=2+\frac34c
$$
甲的利润为
$$
\pi_1=q_1P-q_1c=q_1(2+\frac34c)-q_1c=q_1(2-\frac14c)=\frac12(4-\frac c2)^2=\frac{(8-c)^2}{8}
$$
乙的利润为
$$
\pi_2=q_2P-q_2c=q_2(2+\frac34c)-q_2c=q_2(2-\frac14c)=\frac{(8-c)^2}{16}
$$
甲、乙的总利润为
$$
\pi=\pi_1+\pi_2=\frac{3(8-c)^2}{16}
$$

### 古诺模型和斯塔克尔伯格模型的比较

斯斯塔克尔伯格模型的产量大于古诺模型，价格低于古诺模型，总得益（甲、乙得益之和）小于古诺模型，但甲的得益大于古诺模型甲、乙的总得益，**这反映了两个厂商之间地位不对称性的影响**。

## References

1. 古诺博弈：https://blog.csdn.net/qq_43403025/article/details/133169884?spm=1001.2014.3001.5502
2. 斯塔克尔伯格博弈：https://blog.csdn.net/qq_43403025/article/details/133321576