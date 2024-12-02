---
title: Self-Attention
tags: MATH
create_date: 2024-12-02
update_date: 2024-12-02
hidden: true
---

### Self-Attention

$$
X^{seq}=[x_1,x_2,\dots,x_n]^T\in R^{n\times k},x_i\in R^{k\times1}
$$


$$
W^q,W^k,W^v\in R^{k\times h}
$$

$$
W=[w_1,w_2,\dots,w_k]^T\in R^{k\times h},w_i\in R^{h\times 1}
$$

$$
Q=X^{seq} W^q\in R^{n\times h}\\
\downarrow\\
\begin{bmatrix}
x_{11} & x_{12} & \dots & x_{1k}\\
x_{21} & x_{22} & \dots & x_{2k}\\
& & \ddots & \\
x_{n1} & x_{n2} & \dots & x_{nk}
\end{bmatrix}
[w^q_1 & w^q_2 & \dots & w^q_k]^T\\
=\begin{bmatrix}
\sum x_{1i} w^q_i\\
\sum x_{2i} w^q_i\\
\vdots\\
\sum x_{ni} w^q_i\\
\end{bmatrix}
$$

$$
QK^T\in R^{n\times n}\\
\downarrow\\
\begin{bmatrix}
\sum x_{1i} w^q_i\\
\sum x_{2i} w^q_i\\
\vdots\\
\sum x_{ni} w^q_i\\
\end{bmatrix}

\begin{bmatrix}
\sum x_{1i} w^k_i & \sum x_{2i} w_i^k & \dots & \sum x_{ni}w^k_i
\end{bmatrix}\\
x_{ji} w_i\in R^{h\times1}
\\
=\begin{bmatrix}
q_1^T\\
q_2^T\\
\dots\\
q_n^T
\end{bmatrix}
\begin{bmatrix}
k_1 & k_2 & \dots & k_n
\end{bmatrix}\\
=\begin{bmatrix}
q_1^Tk_1 & q_1^Tk_2 & \dots & q_1^Tk_n\\
q_2^Tk_1 & q_2^Tk_2 & \dots & q_2^Tk_n\\
& & \ddots &\\
q_n^Tk_1 & q_n^Tk_2 & \dots & q_n^Tk_n
\end{bmatrix}
$$

$$
V\in R^{n\times h}\\
\downarrow \\
V=\begin{bmatrix}
v_1^T\\
v_2^T\\
\vdots\\
v_n^T
\end{bmatrix}
$$

$$
QK^T V\in R^{n\times h}\\
\downarrow\\
=\begin{bmatrix}
q_1^Tk_1 & q_1^Tk_2 & \dots & q_1^Tk_n\\
q_2^Tk_1 & q_2^Tk_2 & \dots & q_2^Tk_n\\
& & \ddots &\\
q_n^Tk_1 & q_n^Tk_2 & \dots & q_n^Tk_n
\end{bmatrix}
\begin{bmatrix}
v_1^T\\
v_2^T\\
\vdots\\
v_n^T
\end{bmatrix}\\
=\begin{bmatrix}
\sum q_1^T k_i v_i^T\\
\sum q_2^T k_iv_i^T\\
\vdots\\
\sum q_n^T k_iv_i^T
\end{bmatrix}\\
q_j^T k_iv_i^T\in R^{1\times h}
$$


### Multiple-Head Self-Attention

有多个 $Q$ $K$ $V$

