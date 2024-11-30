---
title: 迭代方法
tags: MATH
create_date: 2024-11-28
update_date: 2024-11-30
---

## 斐波那契法

| $n$   | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $F_n$ | 1   | 1   | 2   | 3   | 5   | 8   | 13  | 21  | 34  | 55  | 89  |

假设寻找 $\min f(x)$，初始查找范围 $x\in [a, b]$

$$
a_0=a+(b-a)\frac{F_{n-2}}{F_n}\\
b_0=a+(b-a)\frac{F_{n-1}}{F_n}\\
$$

比较 $f(a_0)$ 和 $f(b_0)$ 的大小确定新的查找范围

如果 $f(a_0)\le f(b_0)$, 则新的查找范围为 $x\in [a, b_0]$

如果 $f(a_0)\ge f(b_0)$, 则新的查找范围为 $x\in [a_0, b]$

### 寻找 $n$

每一次迭代都会得到一个新的查找范围，新的查找范围至少为上一次查找范围的 $\frac{F_{n-2}}{F_n}$

因此最后的查找范围为原来查找范围的

$$
\frac{F_{n-1}}{F_{n}} \frac{F_{n-2}}{F_{n-1}} \dots \frac{F_1}{F_2} \frac{F_0}{F_1} = \frac{1}{F_n}
$$

## 梯度下降法

$$
X^{(1)}=X^{(0)}-\lambda^{(0)}\nabla f(X^{(0)})
$$

### 寻找最佳步长

$$
\begin{aligned}
f(X^{(1)})&=f(X^{(0)}-\lambda^{(0)}\nabla f(X^{(0)}))\\
&\approx f(X^{(0)})+\nabla f(X^{(0)})^T (-\lambda ^{(0)} \nabla f(X^{(0)}))\\
&+\frac12 (-\lambda^{(0)} \nabla f(X^{(0)}))^T H(X^{(0)}) (-\lambda^{(0)}\nabla f(X^{(0)}))\\
&=f(X^{(0)})-\lambda ^{(0)} \nabla f(X^{(0)}) ^T \nabla f(X^{(0)}) +\frac12 (\lambda^{(0)})^2 \nabla f(X^{(0)})^T H(X^{(0)}) \nabla f(X^{(0)})
\end{aligned}
$$

$$
\frac{\partial f(X^{(1)})}{\partial \lambda^{(0)}} = -\nabla f(X^{(0)})^T \nabla f(X^{(0)})+\lambda^{(0)} \nabla f(X^{(0)})^T H(X^{(0)})\nabla f(X^{(0)})=0
\\
\downarrow\\
\lambda^{(0)}=\frac{\nabla f(X^{(0)})^T \nabla f(X^{(0)})}{\nabla f(X^{(0)})^T H(X^{(0)}) \nabla f(X^{(0)})}
$$

## 牛顿法

### 特殊形式

$$
f(X)=\frac12 X^TAX+BX+c
$$

$$
\nabla f(X)=AX+B\\
\downarrow\\
\nabla f(X^*)=AX^*+B=0
$$

$$
\nabla f(X^{(0)})=AX^{(0)}+B=AX^{(0)}-AX^*\\
\downarrow\\
X^*=X^{(0)}-A^{-1}\nabla f(X^{(0)})
$$

### 一般形式

$$
\begin{aligned}
f(X^*) &= f(X+X^*-X)\\
&\approx f(X)+\nabla f(X)^T (X^*-X)+\frac12 (X^*-X)^T H(X)(X^*-X)
\end{aligned}
$$

$$
\nabla f(X^*)=H(X)(X^*-X)+\nabla f(X)=0\\
\downarrow\\
X^*=X-H(X)^{-1} \nabla f(X)
$$
