---
title: The Delta Function
tags: SCU
---

## Definition

$$
\int_p^{p+\epsilon}\delta_p^\delta(t)dt=1
$$

$$
\delta_p^\epsilon(t)=\left\{\begin{aligned}\frac{1}{\epsilon},&\ p\le t\lt p+\epsilon\\0, &\ elsewhere\end{aligned}\right.
$$

$$
\lim_{\epsilon\to 0}\delta_p^\epsilon=\delta_p
$$

## Combined with Laplace Transform

$$
\begin{aligned}\mathcal{L}\{\delta_p(t)\}(s)&=\int_{0}^{+\infty}\frac{1}{\epsilon}e^{-st}dt\\&=\lim_{\epsilon\to 0}\int_{p}^{p+\epsilon}\frac{1}{\epsilon}e^{-st}dt\\&=\lim_{\epsilon\to 0}\frac1\epsilon\int_{p}^{p+\epsilon}e^{-st}dt\\&=\lim_{\epsilon\to 0}\frac1\epsilon \frac{1}{(-s)}e^{-st}|_{p}^{p+\epsilon}\\&=\lim_{\epsilon\to 0}\frac1{-\epsilon s}(e^{-s(p+\epsilon)}-e^{-sp})\\&=\lim_{\epsilon\to 0}\frac{1}{-\epsilon s}(e^{-s\epsilon}-1)e^{-sp}\\&=\lim_{\epsilon\to 0}\frac{e^{-s\epsilon}-1}{-\epsilon s}e^{-sp}\\&=\lim_{t\to0}\frac{e^{-t}-1}{-t}e^{-sp}\\&=\lim_{t\to 0}\frac{(e^{-t}-1)'}{-t'}e^{-sp}\\&=\lim_{t\to 0}\frac{-e^{-t}}{-1}e^{-sp}\\&=e^{-sp}\end{aligned}
$$
