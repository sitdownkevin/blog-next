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
Q=X^{seq} W^q\in R^{n\times h}\\
\downarrow\\
\begin{bmatrix}
x_1^T\\
x_2^T\\
\vdots\\
x_n^T
\end{bmatrix}
\begin{bmatrix}
w^q_1 & w^q_2 & \dots & w^q_h
\end{bmatrix}\\
=\begin{bmatrix}
x_1^T w^q_1 & x_1^T w^q_2 & \dots & x_1^T w^q_h\\
x_2^T w^q_1 & x_2^T w^q_2 & \dots & x_2^T w^q_h\\
\vdots & \vdots & \ddots & \vdots\\
x_n^T w^q_1 & x_n^T w^q_2 & \dots & x_n^T w^q_h
\end{bmatrix}
$$

$$
QK^T\in R^{n\times n}\\
\downarrow\\
\begin{bmatrix}
q_1^T\\
q_2^T\\
\vdots\\
q_n^T
\end{bmatrix}
\begin{bmatrix}
k_1 & k_2 & \dots & k_n
\end{bmatrix}\\
=\begin{bmatrix}
q_1^T k_1 & q_1^T k_2 & \dots & q_1^T k_n\\
q_2^T k_1 & q_2^T k_2 & \dots & q_2^T k_n\\
\vdots & \vdots & \ddots & \vdots\\
q_n^T k_1 & q_n^T k_2 & \dots & q_n^T k_n
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
q_1^T k_1 & q_1^T k_2 & \dots & q_1^T k_n\\
q_2^T k_1 & q_2^T k_2 & \dots & q_2^T k_n\\
\vdots & \vdots & \ddots & \vdots\\
q_n^T k_1 & q_n^T k_2 & \dots & q_n^T k_n
\end{bmatrix}
\begin{bmatrix}
v_1^T\\
v_2^T\\
\vdots\\
v_n^T
\end{bmatrix}\\
=\begin{bmatrix}
\sum_{j=1}^n (q_1^T k_j) v_j^T\\
\sum_{j=1}^n (q_2^T k_j) v_j^T\\
\vdots\\
\sum_{j=1}^n (q_n^T k_j) v_j^T
\end{bmatrix}
$$

### Multiple-Head Self-Attention

有多个 $Q$ $K$ $V$
