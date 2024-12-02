---
title: "Econometric Knowledge"
tags: MATH
create_date: 2024-10-17
update_date: 2024-12-02
---

## Standard errors

[OLS 的标准误差、稳健误差、HC0、HC1、HC2 推导及 Python 代码实现](/jupyter/standard_errors.html)

<!-- [陈强教授的讲义](/pdf/China22_Qiang.pdf) -->

## 同方差和异方差

$$
Y_i=\alpha+\beta_1 x_i+e_i
$$

- $x_i\in \mathbb{R}$
- $Y_i\in \mathbb{R}$

$$
\beta_1=\frac{Cov(Y_i,x_i)}{V(x_i)}
$$






$$
Y_i=\beta_0+\beta_1x_{1i}+\dots+\beta_k x_{ki}+\dots+\beta_{K}x_{Ki}+e_i
$$

- $x_{ki}\in \mathbb{R}$

- $X_i=[x_{1i},x_{2i},\dots,x_{Ki}]^T\in \mathbb{R}^K$

$$
\beta_k=\frac{Cov(Y_i,\tilde x_{ki})}{V(\tilde x_{ki})}
$$

- $\tilde x_{ki}\in \mathbb{R}^K$





---

$$
y_i=x_i^T\beta+\varepsilon\\
y=X\beta+\epsilon\\
\hat\beta=\arg\min_\beta S(\beta)\\
S(\beta)=\sum_{i=1}^n|y_i-x_i^T\beta|^2=||y-X\beta||^2
$$

$$
\frac{\partial S(\beta)}{\partial \beta}=-X^T2(y-X\beta)=0\\
X^Ty=X^TX\beta\\
\downarrow\\
\hat\beta=(X^TX)^{-1}X^Ty\\
\downarrow\\
\hat\beta = (X^TX)^{-1}X^T(X\beta+\epsilon)=(X^TX)^{-1}(X^TX)\beta+(X^TX)^{-1}X^T\epsilon\\
\downarrow\\
\hat\beta=\beta+(X^TX)^{-1}X^T\epsilon
$$


$$
\hat y=X\hat \beta =X(X^TX)^{-1}X^T y=Py\\
\downarrow\\
\hat\epsilon=y-\hat y=y-X\hat\beta=(I-P)y=My\\
\downarrow\\
\hat\epsilon=M(X\beta+\epsilon)=MX\beta+M\epsilon=M\epsilon
$$


- $PX=X\rightarrow (I-P)X=MX=0$




$$
y=X\beta+\epsilon
$$

$$
\hat\beta_{OLS}=(X^TX)^{-1}X^Ty
$$

$$
\mathbb{\hat V}[\hat\beta_{OLS}]=s^2 (X^TX)^{-1}
$$


$$
\begin{aligned}
\mathbb{\hat V}[\hat\beta_{OLS}]&=E[(\hat \beta_{OLS}-E[\hat\beta_{OLS}])^2]\\
&=E[(\hat\beta_{OLS}-\beta)^2]\\
&=E[((X^TX)^{-1}X^T\epsilon)^T((X^TX)^{-1}X^T\epsilon)]\\
&=((X^TX)^{-1}X^T)^T E[\epsilon^T\epsilon]  ((X^TX)^{-1}X^T) \\
&=((X^TX)^{-1}X^T)^T \mathbb{V}[\epsilon]  ((X^TX)^{-1}X^T) \\
&=(X^TX)^{-1} X^T \mathbb{V}[\epsilon] X (X^TX)^{-1}
\end{aligned}
$$




---


$$
y=X\beta+\epsilon
$$

$$
\hat y=X\hat\beta\\
\hat\epsilon=\hat y-y
$$


$$
\arg\min_{\beta} \epsilon^T\epsilon=||y-X\beta||^2\\
\downarrow\\
\frac{\partial \epsilon^T\epsilon}{\partial \beta}=2(-X)^T(y-X\beta)=0\\
\downarrow\\
X^TX\hat\beta=X^Ty\\
\downarrow\\
\hat\beta=(X^TX)^{-1}X^Ty=(X^TX)^{-1}X^T (X\beta+\epsilon)\\
\downarrow\\
\hat\beta=(X^TX)^{-1}X^TX\beta+(X^TX)^{-1}X^T\epsilon\\
\downarrow\\
\hat\beta=\beta+(X^TX)^{-1}X^T\epsilon
$$

$$
\mathbb{\hat V}[\hat\beta]=s^2 (X^TX)^{-1}\\
s^2=\frac{\sum_i\hat\epsilon_i^2}{n-k}
$$

$$
\begin{aligned}
\mathbb{ V}[\hat\beta]&=E[(X^TX)^{-1}X^T\epsilon \epsilon^T X (X^TX)^{-1}]\\
&=(X^TX)^{-1}X^T E[\epsilon\epsilon^T] X(X^TX)^{-1}\\
&=(X^TX)^{-1}X^T \mathbb{V}[\epsilon]X(X^TX)^{-1}
\end{aligned}
$$
上面这个算不出来，因为 $\mathbb{V}[\epsilon]$ 不知道
$$
\mathbb{\hat V}_{\mathrm{HCE}}[\hat\beta]=(X^TX)^{-1}X^T \mathrm{diag}(\hat\sigma_1,\dots,\hat\sigma_n) X(X^TX)^{-1}
$$


$\epsilon_i$ 如果是独立的，则 $\mathbb{V}[\epsilon]=\mathrm{diag} (\sigma_1^2,\dots,\sigma_n^2)$

$\mathbb{V}[\hat \epsilon]=\mathrm{diag}(\hat\epsilon_1^2,\dots,\hat\epsilon_n^2)$

如果 $\sigma_1=\dots=\sigma_n$

那么 $\mathbb{V [\epsilon]}=\mathbb{I} \sigma$