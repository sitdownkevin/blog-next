---
title: The Spectral Theorem
tags: MATH
create_date: null
update_date: null
---


Goal: $Q^TAQ=D$ for any symmetric matrix $A$

---

- By induction method.
- Find $A\sim B$ and $B\sim D\longrightarrow A\sim D$

ASSUME $Q_1=[v_1:v_2:\ldots:v_n]$ an orthogonal matrix for which $Av_1=\lambda_1v_1$.

$$
\begin{aligned}
Q_1^TAQ_1=&\begin{bmatrix}v_1^T\\v_2^T\\\vdots\\v_n^T\end{bmatrix}A[v_1:v_2:\ldots:v_n]\\
=&\begin{bmatrix}v_1^T\\v_2^T\\\vdots\\v_n^T\end{bmatrix}[Av_1:Av_2:\ldots:Av_n]\\
=&\begin{bmatrix}v_1^T\\v_2^T\\\vdots\\v_n^T\end{bmatrix}[\lambda_1v_1:Av_2:\ldots:Av_n]\\
=&\left [\begin{array}{c:c}\lambda_1&*\\\hdashline0&A_1 \end{array}\right]=B
\end{aligned}
$$

$$
B^T=Q_1^TA^TQ_1=Q_1^TAQ_1=B
$$

$$
\Rightarrow B\ is\ symmertric
$$

$$
\Rightarrow\ A_1\ is \ symmetric
$$

$$
\therefore\ B=\left[\begin{array}{c:c}\lambda_1&0\\\hdashline0&A_1 \end{array}\right]
$$
---
$$
\because\ A\sim B\\\Rightarrow c_A(\lambda)=c_B(\lambda)
$$

$$
\begin{aligned}
\therefore\ c_A(\lambda)= c_B(\lambda)=&\mathrm{det}(B-\lambda I)=\mathrm{det}(\left[\begin{array}{c:c}\lambda_1&0\\\hdashline0&A_1\end{array}\right]-\lambda I)\\
=&\mathrm{det}(\left[\begin{array}{c:c}\lambda_1-\lambda&0\\\hdashline0&A_1-\lambda I'\end{array}\right])\\
=&(\lambda_1-\lambda)\mathrm{det}(A_1-\lambda I')\\
=&(\lambda_1-\lambda)c_{A_1}(\lambda)
\end{aligned}
$$

$\therefore$ The characteristic polynomial of $A_1$ divides the characteristic polynomial of $A$. It follows that the eigenvalues of $A_1$ are also eigenvalues of $A$. 

---

$$
{A_1}\ is \ a \ k\times k \ real\  symmertric \ matrix \\\Rightarrow\ Let\  P_2^TA_1P_2=D_1
$$

$$
{Q_2}=\left[\begin{array}{c:c}1&0\\\hdashline0&P_2\end{array}\right]\\Q=Q_1Q_2
$$

$$
\begin{aligned}Q^TAQ=&(Q_1Q_2)^TA(Q_1Q_2)=(Q_2^TQ_1^T)A(Q_1Q_2)=Q_2^TBQ_2\\=&\left[\begin{array}{c:c}1&0\\\hdashline0&P_2^T\end{array}\right]\left[\begin{array}{c:c}\lambda_1&0\\\hdashline0&A_1\end{array}\right]\left[\begin{array}{c:c}1&0\\\hdashline0&P_2\end{array}\right]\\=&\left[\begin{array}{c:c}\lambda_1&0\\\hdashline0&P_2^TA_1P_2\end{array}\right]\\=&\left[\begin{array}{c:c}\lambda_1&0\\\hdashline0&D_1\end{array}\right]\end{aligned}
$$
