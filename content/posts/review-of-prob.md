---
title: Review of Probability, Random Variables, and Distributions
tags: SCU
create_date: null
update_date: null
---

> This note is a backup from Notion.

## Contents

## Lecture 8

### Definition of Variance

- Def: The variance of $X,\ Var(X)$ is:
  - If $X$ is discrete

    $$
    \sigma^2=Var(X)=E((X-\mu_x)^2)=\sum_x(x-\mu_x)^2f(x)
    $$

  - If $X$ is continuous

    $$
    \sigma^2=Var(X)=E((X-\mu_x)^2)=\int_{-\infty}^{+\infty}(x-\mu_x)^2f(x)dx
    $$

  - $\sigma$ is called the standard deviation
  - $\sigma^2=E((X-\mu_x)^2)=E(X^2-2\mu_xX+\mu_x^2)=E(X^2)-2\mu_xE(X)+\mu_x^2=E(X^2)-E^2(X)$

- Properties
  1. $\forall X,\ Var(X)\ge0,\ Var(C)=0$

     $Var(X)=0\Leftrightarrow P(X=C)=1$

  2. $Var(CX)=C^2Var(X)$
  3. If $X$ and $Y$ are independent, then

     $E(XY)=E(X)E(Y)$

     $Var(X\pm Y)=Var(X)+Var(Y)$

  4. If $X_1,X_2...X_n$ are mutually independent,
     $Var(\sum_{i=1}^nC_iX_i+b)=\sum_{i=1}^{n}C_i^2Var(X_i)$

### Covariance

- Def: the covariance of $X$ and $Y$ is

  $$
  \sigma_{XY}=Cov(X,Y)=E[(X-\mu_x)(Y-\mu_y)]
  $$

- $\sigma_{XY}=Cov(X,Y)=E(XY)-E(X)E(Y)$
- If $X$ and $Y$ are independent, $Cov(X,Y)=0$
- The inverse direction may not be true!

  $Var(X\pm Y)=Var(X)+Var(Y)\pm 2Cov(X,Y)$

### Correlation coefficient

- Def: The correlation coefficient of $X$ and $Y$ is

  $$
  \rho_{XY}=\frac{\sigma_{XY} }{\sigma_Y\sigma_Y}
  $$

- If $X$ and $Y$ are independent, $\rho_{XY}=0$
- Properties:
  1. $\forall X,Y\ |\rho_{XY}\le1|$

     pf: use $Var(Y-tX)\ge0$

  2. $|\rho_{XY}|=1\Leftrightarrow \exists a\ne0,\ b\\ s.t.\ P(Y=aX+b)=1$
  3. If $|\rho_{XY}|=1$, we call $X$ and $Y$ are completely linear correlated
  4. If $\rho_{XY}=0$, $X$ and $Y$ are called uncorrelated, means there is not any "linear correlation" between $X$ and $Y$.
  5. independent $\longrightarrow$ uncorrelated

- $|\rho_{XY}|$ denote the strongness of linear correlation between $X$ and $Y$
- $\rho_{XY}\gt0$ means there is positive linear correlation between $X$ and

  If $X$ becomes larger, then $Y$ tends to become stronger

## Lecture 9

### Bernoulli Distribution

- 0-1 distribution $X\sim B(1,p)$

  $$
  F(x)=\left\{ \begin{aligned}  &0,&x\lt0\\&1-p,&0\le x\lt1\\&1,&x\ge1\end{aligned} \right.
  $$

- $E(X)=p,\ Var(X)=p-p^2=pq$
- Indicator $A\subset S,\ I_A(\omega)=\left \{ \begin{aligned}&1,&if\ \omega\in A\\&0,&if\ \omega\notin  A\end{aligned}\right.$
- It can be used everywhere

### Binomial Distribution

- Def: the number of success $X$ in $n$ Bernoulli trails $X\sim B(n,p)$
- If $n=1$, it becomes Bernoulli distribution
- $pmf$: $f(x)=P(X=x)=b(x;n,p)=C_n^xp^xq^{n-x},x=0,1,...,n$
- Binomial: $\sum_{x=0}^nb(x;n,p)=\sum^{n}_{x=0}C_n^xp^xq^{n-x}=(p+q)^n=1$
- $E(X)=np,Var(X)=npq$
  - hint: $X_i=\left\{\begin{aligned} &1,&the\ i-th\ trail \ succeeds\\&0,&the\ i-th\ trail\ fails \end{aligned} \right.$
  - $X_i$ are mutually independent $X_i\sim B(1,p),\ X=\sum_{i=1}^nX_i$

### Multinomial Distribution

- Def: Multinomial experiments repeatedly: independent, $k$ outcomes each time
- DefL Multinomial distribution: the number of each outcomes in $n$ trails
- Joint $pmf$: $f(x_1,x_2,...,x_k;p_1,p_2,...,p_k,n)=\frac{n!}{x_1!x_2!...x_k!}p_1^{x_1}p_2^{x_2}...p_k^{x_k}$
- Each marginal distribution is binomial

## Lecture 10

### Hypergeometric Distribution

- Motivation: Sampling without replacement
- Def: $X$ the number of success
  1. $n$ is selected from $N$ terms without replacement;
  2. of $N$ terms, $k$ are success and $N-k$ are failures.

$$
X\sim H(N,n,k)
$$

- $pmf$:

$$
f(x;N,n,k)=\frac{C_{k}^{n}C_{n-x}^{N-k} }{C_{n}^{N} }, \ max(0,n-(N-k))\le x\le min(n,k)
$$

- Relationship to Binomial
  - Binomial is the limit case for hypergeometric when $N$ approaches infinity
  - When $N$ is larger enough($\frac nN$ is small): $f(x;N,n,k)\approx b(x;n,\frac kN)$
- $X$ is hypergeometric with $N,\ n\ and \ k$, then

  $E(X)=n\frac kN$

  $Var(X)=\frac{N-n}{N-1}n\frac kN(1-\frac kN)$

### Multivariate Hypergeometric

- N terms be Lectureified into k kinds, select n randomly, number of each kind

  $$
  f(x_1,x_2,...,x_k;a_1,a_2,...,a_k,N,n)=\frac{C_{a_1}^{x_1}C_{a_2}^{x_2}...C_{a_k}^{x_k} }{C_N^n}
  $$

- Each marginal is hypergeometric!

### Geometric Distribution

- Def: Do Bernoulli experiments until succeed, $X$ the number of trails $X\sim G(p)$
- pmf: $g(x;p)=q^{x-1}p,x=1,2,3...$
- Mean $E(X)$ and variance $Var(X)$

  $E(X)=\frac 1p,\ Var(X)=\frac{q}{p^2}$

### Negative Binomial Distribution

- Def: Do Bernoulli experiments until the k-th succeed, $X$ the number of trails $X\sim NB(k,p)$
- pmf:

  $b^*(x;k,p)=C_{x-1}^{k-1}q^{x-k}p^k,\ x=k,k+1,k+2,...$

- Mean $E(X)$ and variance $Var(X)$

  $E(X)=\frac kp,\ Var(X)=\frac{kp}{p^2}$

### Poisson Distribution

- Def: number of occurring in a Poisson process
- Derivation: Poisson theorem

  $\lim_{n\to\infty}C_n^x(\frac \lambda n)^x (1-\frac \lambda n)^{n-x}=\frac{\lambda^x}{x!}e^{-\lambda}$

- pmf:

  $p(x;\lambda)=\frac{\lambda^x}{x!}e^{-\lambda},\ x=0,1,2...$

- Expectation:

  $X\sim P(\lambda),\ E(X)=\lambda,\ Var(X)=\lambda$

- Relationship to Binomial
  - Poisson distribution is the limit case of binomial when $n$ approaches infinity while $np$ is fixed
  - If $n(n\ge50)$ is large while $p(p\le0.1)$ is small, $X\sim B(n,p)\approx P(np)$

## Lecture 11

### Uniform Distribution

- Def: $X$ is called uniform distribution on $[a,b]$ if its density satisfy: $X\sim U(a,b)$

  $$
  f(x)=\left\{\begin{aligned} &\frac{1}{b-a},&x\in[a,b]\\&0,&elsewhere\end{aligned}\right.
  $$

- cdf and probability
- Expectations: $E(X)=\frac{a+b}{2},Var(X)=\frac{(b-a)^2}{12}$

### Exponential Distribution

- Def: $X$ is called exponential distribution if

  $$
  f(x)=\left\{\begin{aligned} &\frac{1}{\beta}e^{-\frac{x}{\beta} },&x\gt0\\ &  0,&x\le0\end{aligned} \right.
  $$

- cdf: $F(x)= \left\{\begin{aligned} &0,&x\le0\\ &1-e^{-\frac{x}{\beta} }, &x\gt0\end{aligned}\right.$

### Gamma Distribution

### Gamma Function

- Def: Gamma function

  $$
  \Gamma(\alpha)=\int_{0}^{+\infty}x^{\alpha-1}e^{-x}dx,\alpha\gt0
  $$

- Properties:

  $\Gamma(1)=1,\Gamma(0.5)=\sqrt \pi\\\Gamma(\alpha+1)=\alpha\Gamma(\alpha),\Gamma(n)=(n-1)!$

- Def: the Gamma density is as following: $X\sim \Gamma(\alpha,\beta)$

  $f(x)=\left\{\begin{aligned} &\frac{1}{\beta^\alpha\Gamma(\alpha)}x^{\alpha-1}e^{-\frac x\beta}, &x\gt0\\&0,&x\le0\end{aligned} \right.$

- Exponential is special case of Gamma density $X\sim e(\beta)=\Gamma(1,\beta)$
- Expectations:

  $E(X)=\alpha\beta,Var(X)=\alpha\beta^2$

  $X\sim e(\beta),E(X)=\beta,Var(X)=\beta^2$

### Normal Distribution

### Standard Normal

- Def: $X$ is called standard normal if density

  $$
  \varphi(x)=\frac{1}{\sqrt{2\pi} }e^{-\frac{x^2}{2} },x\in(-\infty,+\infty)
  $$

- The cdf can be found from tables

  $\Phi(x)=\int_{-\infty}^{x}\varphi(t)dt=\int_{-\infty}^{x}\frac{1}{\sqrt{2\pi} }e^{-\frac{t^2}{2} }dt$

  $\Phi(0)=0.5,\Phi(-x)=1-\Phi(x)$

- Expectations: if $X$ is standard normal

  $E(X)=0,Var(X)=1$

  $X\sim N(0,1)$

- Def: $X$ is normal with parameter $\mu,\sigma^2$

  $$
  X\sim N(\mu,\sigma^2)\Leftrightarrow \frac{X-\mu}{\sigma}\sim N(0,1)
  $$

- The density of $N(\mu,\sigma^2)$ is:

  $F(x)=P(X\le x)=P(\frac{X-\mu}{\sigma}\le\frac{x-\mu}{\sigma})=\Phi(\frac{x-\mu}{\sigma})$

  $f(x)=\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2} },x\in(-\infty,+\infty)$

- Expectations:

  $E(X)=\mu,Var(X)=\sigma^2$

- *p*th quantile
  - Def: for _p_ in $(0,1)$, the *p*th quantile $x_p$ of $X$ is $P(X\le x_p)=p$
  - Def: for _p_ in $(0,1)$, the critical value $c_p$ of $X$ is $P(X\ge x_p)=p$
  - $x_p=c_{1-p}$

## Lecture 12

### Central Limit Theorem

- Th (Lindeberge-Levy): if $\{X_i\}$ is a iid sequence with

  $$
  E(X_k)=\mu,Var(X_k)=\sigma^2\\Y_n=\frac{\sum_{k=1}^{n}X_k-n\mu}{\sqrt n \sigma}=\frac{\frac 1n\sum_{k=1}^{n}X_k-\mu}{\sigma/\sqrt n}
  $$

- Then

  $$
  \lim_{n\to+\infty}P(Y_n\le x)=\Phi(x)\\\sum_{k=1}^{n}X_k\sim N(n\mu,n\sigma^2),\frac 1n\sum_{k=1}^{n}X_k\sim N(\mu, \frac{\sigma^2}{n})
  $$

## Lecture 13

### Estimation Methods

1. **Moment estimate**
   - Fundamental basis: $\{ X_i\}$iid $E(X_i)=\mu, Var(X_i)=\sigma^2$

     $\overline X=\frac 1n\sum_{i=1}^n X_i\sim N(\mu,\frac{\sigma^2}{n})\Rightarrow\overline X\xrightarrow{n\to\infty} \mu$

   - Distribution parameter $\theta$ is related to $\mu$
   - Estimation:

     $$
     E(x)=\mu=g(\theta)\longrightarrow\theta=h(\mu)\approx h(\overline X)=\hat\theta
     $$

2. **The Method of Maximum Likelihood**

- Suppose the population $X\sim f(x,\theta)$

  $P(X_1=x_1,X_2=x_2,...,X_n=x_n)=f(x_1,\theta)f(x_2, \theta)...f(x_n,\theta)\equiv L(\theta)$

- $L(\theta)$ is called **likelihood function**
- The estimation of mle is chosen as:

  $$
  L(\hat\theta)=max L(\theta)
  $$

- Solution of mle for uniform distribution
  1. find the likelihood function for $X\sim U(a,b)$

     $L(a,b)=\prod_{i=1}^{n}f(x_i)=(\frac{1}{b-a})^n$

  2. find mle $\frac{\partial L(a,b)}{\partial a}\gt0,\frac{\partial L(a,b)}{\partial b}\lt0$

     $\forall i,a\lt X_i\lt b\Rightarrow a\le min\{X_i\},b\ge max\{X_i\}$

  3. The likelihood function is strictly increasing with $a$ but strictly decreasing with $b$, so the mle are:

     $\hat a=min\{X_i\},\hat b=max\{Xi\}$

## Lecture 14

### Unbiasedness

- Def: if $E(\hat\theta)=\theta$, $\hat\theta$ is called unbiased
- Def: $b(\hat\theta)=E(\hat\theta)-\theta$ is called bias
- Def: if $b(\hat\theta)\ne0,\lim_{n\to+\infty}b(\hat\theta)=0$, $\hat\theta$ is asymptotically

### Efficiency

- Def: both $\hat\theta_1$ and $\hat\theta_2$ are biased, $\hat\theta_1$ is more efficient than $\hat\theta_2$ if $Var(\hat\theta_1)\lt Var(\hat\theta_2)$

### Mean Squared Error(MSE)

- Def: the mean squared error is:

  $M(\hat\theta)=E[(\hat\theta-\theta)^2]$

- The MSE can be computed as:

  $M(\hat\theta)=Var(\hat\theta)+b^2(\hat\theta)$

## Lecture 15

### Chi-Squared Distribution

$$
X_i\sim N(0,1),X=\sum_{i=1}^{n}X_i^2\sim \chi^2(n)
$$

- Derive of density:

  $\chi^2(n)=\Gamma(\frac n2, 2)$

  $f(x;n)= \left\{\begin{aligned} &\frac{1}{2^{n/2}\Gamma(n/2)}x^{n/2-1}e^{-x/2},&x\gt0\\&0,&elsewhere \end{aligned} \right.$

- Expectations: $X\sim\chi^2(n)\Rightarrow E(x)=n,Var(X)=2n$
- Chi-Squared distributions are addictive:

  $X\sim\chi^2(n),Y\sim\chi^2(m),X,Y\ indep\Rightarrow X+Y\sim\chi^2(n+m)$

### t-Distribution

$$
X\sim N(0,1),Y\sim\chi^2(n)\Rightarrow T=\frac{X}{\sqrt{Y/n} }\sim t(n)
$$

- Density:

  $f(t)=\frac{\Gamma[(n+1)/2]}{\Gamma(n/2)\sqrt{n\pi} }(1+\frac{t^2}{n})^{-(n+1)/2},-\infty\lt t\lt +\infty$

- Even function
- Limit is standard normal: $\lim_{n\to\infty} f(t)=\varphi(t)$

### F-Distribution

$$
X\sim \chi^2(n_1), Y\sim \chi^2(n_2)\Rightarrow F=\frac{X/n_1}{Y/n_2}\sim F(n_1, n_2)
$$

- Property: $F\sim F(n_1,n_2)\Rightarrow1/F\sim F(n_2,n_1)$
- The limit case is Normal Distribution

### Sampling Distribution Theorems

- Suppose the population is Normal: $X\sim N(\mu,\sigma^2)$
- Th1:

  $$
  \overline{X}\sim N(\mu,\frac{\sigma^2}{n})or\frac{\overline X-\mu}{\sigma/\sqrt{n} }\sim N(0,1)
  $$

- Th2: $\overline X$ and $S^2$ are independent, and

  $$
  \frac{(n-1)S^2}{\sigma^2}=\sum_{i=1}^{n}\frac{(X_i-\overline X)^2}{\sigma^2}\sim\chi^2(n-1)
  $$

- Th3:

  $$
  \frac{\overline X-\mu}{S/\sqrt{n} }\sim t(n-1)
  $$

## Lecture 16

### CI under Normal Distribution

- find $\mu$
  - $X\sim N(\mu, \sigma^2)$, and $\sigma^2$ is given
    1. find $\overline X\approx\mu$
    2. construct $Z=\frac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1)$
    3. find $P(-z_{\alpha/2}<Z<z_{\alpha/2})=1-\alpha$
    4. solve $-z_{\alpha/2}<Z<z_{\alpha/2}\Leftrightarrow \overline X-z_{\alpha/2}\frac{\sigma}{\sqrt n}<\mu <X+z_{\alpha/2}$
  - $X\sim N(\mu, \sigma^2)$, and $\sigma^2$ is unknown
    1. find $\overline X\approx\mu$
    2. construct $T=\frac{\overline X-\mu}{S/\sqrt n}\sim t(n-1)$
    3. find $P(-t_{\alpha/2}<T<t_{\alpha/2})=1-\alpha$
    4. solve $-t_{\alpha/2}<T<t_{\alpha/2}\Leftrightarrow \overline X-t_{\alpha/2}\frac{S}{\sqrt n}<\mu<\overline X+t_{\alpha/2}\frac{S}{\sqrt n}$
- find $\sigma$
  - $X\sim N(\mu,\sigma^2)$, and $\mu$ is given
    1. construct $W=\sum_{i=1}^{n}\frac{(X_i-\mu)^2}{\sigma^2}\sim\chi^2(n)$
    2. solve $P(\chi^2_{1-\alpha/2}<W<\chi^2_{\alpha/2})=1-\alpha$
  - $X\sim N(\mu,\sigma^2)$, and $\mu$ is unknown
    1. construct $W=\frac{n-1}{\sigma^2}S^2=\sum_{i=1}^{n}\frac{(X_i-\overline X)^2}{\sigma^2}\sim\chi^2(n-1)$

### Sampling Distribution under Two Populations

- Suppose $X\sim N(\mu_1, \sigma_1^2), \ Y\sim N(\mu_2,\sigma_2^2)$
- $X$, $Y$ independent, $n_1,$ $n_2$ samples from $X,\ Y$
- Th1: var known

  $$
  \frac{(\overline X-\overline Y)-(\mu_1-\mu_2)}{\sqrt{\sigma_1^2/n+\sigma_2^2/n_2} }\sim N(0,1)
  $$

- Th2: var unknown but equal

  $$
  \frac{(\overline X-\overline Y)-(\mu_1-\mu_2)}{S_p\sqrt{1/n_1+1/n_2} }\sim t(n_1+n_2-2)
  $$

$$
S_p^2=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}
$$

- Th3: Sampling theorem for Variance

$$
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}\sim F(n_1-1,n_2-1)
$$

## Sample variance

$$S^2=\frac{\sum(X_i-\overline X)^2}{n-1}$$

$$
X\sim \ ?,\ E(X)=\mu,\ Var(X)=\sigma^2\\\overline X=\frac 1n\sum X_i\sim N(\mu,\frac{\sigma^2}{n})
$$

$$
Var(X)=E(X^2)-E^2(X)\\Var(\overline X )=E({\overline X}^2)-E^2(\overline X)\\
$$

$$
E(X^2)=\mu^2+\sigma^2\\E(\overline X^2)=\mu^2+\frac{\sigma^2}{n}
$$

$$
\begin{aligned}E(\sum(X_i-\overline X)^2)=& E(\sum(X_i^2+\overline X^2-2X_i\overline X))\\=&E(\sum X_i^2+n\overline X^2-2\overline X\sum X_i)\\=&E(\sum X_i^2+n\overline X^2-2n\overline X^2)\\=&\sum E(X_i^2)-E(n\overline X^2)\\=&nE(X^2)-nE(\overline X^2)\\=&n(\mu^2+\sigma^2)-n(\mu^2+\frac{\sigma^2}{n})\\=&n\sigma^2-\sigma^2=(n-1)\sigma^2\end{aligned}\\
$$

$$
\begin{aligned}\Rightarrow E(\sum(X_i-\overline X)^2)&=(n-1)\sigma^2\\\frac{E(\sum(X_i-\overline X)^2)}{n-1}&=\sigma^2\\E(\frac{\sum(X_i-\overline X)^2}{n-1})&=\sigma^2\end{aligned}
$$

$$
S^2=\frac{\sum(X_i-\overline X)^2}{n-1}\Rightarrow E(S^2)=\sigma^2
$$
