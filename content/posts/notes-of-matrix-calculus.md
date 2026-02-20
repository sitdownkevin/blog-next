---
title: 矩阵求导
tags: MATH
create_date: 2024-10-02
update_date: 2024-10-03
---

## Contents

## 矩阵求导的基本法则

### 标量对标量

...

### 标量对向量

$f$

$x_{p\times1}=(x_1,x_2,\dots,x_p)^T$

$$
\frac{\partial f}{\partial x}_{p\times1}=(\frac{\partial f}{\partial x_1},\frac{\partial f}{\partial x_2},\dots,\frac{\partial f}{\partial x_p})^T
$$

### 向量对标量

$f_{m\times1}=(f_1,f_2,\dots,f_m)^T$

$x$

$$
\frac{\partial f}{\partial x}_{1\times m}=(\frac{\partial f_1}{\partial x},\frac{\partial f_2}{\partial x},\dots,\frac{\partial f_m}{\partial x})
$$

### 向量对向量

$f_{m\times1}=(f_1,f_2,\dots,f_m)^T$

$x_{p\times1}=(x_1,x_2,\dots,x_p)^T$

$$
\frac{\partial f}{\partial x}_{p\times m}=
\begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_2}{\partial x_1} & \cdots & \frac{\partial f_m}{\partial x_1} \\
\frac{\partial f_1}{\partial x_2} & \frac{\partial f_2}{\partial x_2} & \cdots & \frac{\partial f_m}{\partial x_1} \\
\vdots & \vdots & \ddots & \vdots\\
\frac{\partial f_1}{\partial x_p} & \frac{\partial f_2}{\partial x_p} & \cdots & \frac{\partial f_m}{\partial x_p}\\
\end{bmatrix}
$$

### 标量对矩阵

$f$

$x_{p\times q}=\begin{bmatrix}x_{11} & x_{12} & \cdots & x_{1q}\\x_{21} & x_{22} & \cdots & x_{2q}\\\vdots & \vdots &\ddots & \vdots\\x_{p1} & x_{p2} & \cdots & x_{pq}\end{bmatrix}$

$$
\frac{\partial f}{\partial x}_{p\times q}=\begin{bmatrix}
\frac{\partial f}{\partial x_{11}} & \frac{\partial f}{\partial x_{12}} & \cdots & \frac{\partial f}{\partial x_{1q}}\\
\frac{\partial f}{\partial x_{21}} & \frac{\partial f}{\partial x_{22}} & \cdots & \frac{\partial f}{\partial x_{2q}}\\
\vdots & \vdots &\ddots & \vdots\\
\frac{\partial f}{\partial x_{p1}} & \frac{\partial f}{\partial x_{p2}} & \cdots & \frac{\partial f}{\partial x_{pq}}\\
\end{bmatrix}
$$

### 矩阵对标量

$f_{m\times n}=\begin{bmatrix}f_{11} & f_{12} & \cdots & f_{1n} \\ f_{21} & f_{22} & \cdots & f_{2n}\\\vdots&\vdots&\ddots&\vdots\\f_{m1}& f_{m2} &\cdots & f_{mn}\end{bmatrix}$

$x$

$$
\frac{\partial f}{\partial x}_{n\times m}=\begin{bmatrix}
\frac{\partial f_{11}}{\partial x} & \frac{\partial f_{21}}{\partial x} & \cdots & \frac{\partial f_{m1}}{\partial x}\\
\frac{\partial f_{12}}{\partial x} & \frac{\partial f_{22}}{\partial x} & \cdots & \frac{\partial f_{m2}}{\partial x}\\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial f_{1n}}{\partial x} & \frac{\partial f_{2n}}{\partial x} & \cdots & \frac{\partial f_{mn}}{\partial x}\\
\end{bmatrix}
$$

### 更高维度的

...

## Reference

- https://soptq.me/2020/06/19/matrix-derivation/
