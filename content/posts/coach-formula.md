---
title: Coach Formula
tags: SCU
create_date: null
update_date: 2024-11-19
---

## Contents

## NVIDIA formula

$$
\mathrm{Score}=\alpha(\mathcal{H}(x_i^{\mathcal{U}}))-\frac1\alpha(\mathcal{MI}(x_i^{\mathcal{U}},\mathcal{T}))
$$

- $\mathcal{H(x_i^{\mathcal{U}})}$

$$
\mathcal{H}(x_i^{\mathcal{U}})=-\sum_{q=0}^Q\sum_{c=0}^c p(y_i=c\mid x_i^{\mathcal{U}})\log(p(y_i=c\mid x_i^{\mathcal{U}}))
$$

- $\mathcal{MI}(x_i^{\mathcal{U}},\mathcal{T})$

$$
\mathcal{MI}=\sum_{x_i^{\mathcal{T}}} P(x_i^{\mathcal{U}},x_i^{\mathcal{T}})\log(\frac{P(x_i^{\mathcal{T}},x_j^{\mathcal{U}})}{P(x_i^{\mathcal{T}})P(x_j^{\mathcal{U}})})
$$

## Coach formula

Old

$$
\mathrm{Score_1}=\mathcal{H}(x_i^{\mathcal{U}})+\lambda(x_i^{\mathcal{U}})
$$

$$
\mathrm{Score_2}=\mathcal{MI(x_i^{\mathcal{U}},\mathcal{T})}
$$

$$
\mathrm{Score_3}=\mathcal{MI}(x_i^{\mathcal{U}},\mathcal{U})
$$

$$
\mathrm{Score_1}=\mathcal{H}(x_i^{\mathcal{U}})+\lambda(x_i^{\mathcal{U}})
$$

$$
\mathrm{Score_2}=\alpha\cdot\mathcal{MI(x_i^{\mathcal{U}},\mathcal{U})}-\frac1\alpha\cdot\mathcal{MI(x_i^{\mathcal{U}},\mathcal{T})}
$$

> $\alpha=1$

## Dataset

CHAOS - Combined (CT-MR) Healthy Abdominal Organ Segmentation

[Homepage](https://chaos.grand-challenge.org/)

![1699260885748](https://cdn.statically.io/gh/sitdownkevin/ImageHosting@main/1699260885748.png)

Liver and Liver Tumor Segmentation

[Kaggle homepage](https://www.kaggle.com/datasets/andrewmvd/lits-png) | [Homepage](https://competitions.codalab.org/competitions/17094)

The liver is a common site of primary (i.e. originating in the liver like hepatocellular carcinoma, HCC) or secondary (i.e. spreading to the liver like colorectal cancer) tumor development. Due to their heterogeneous and diffusive shape, automatic segmentation of tumor lesions is very challenging. Until now, only interactive methods achieved acceptable results segmenting liver lesions.

130 CT scans, resized to 256x256 and converted to PNG for segmentation of the liver as well as tumor lesions.

![1699260928004](https://cdn.statically.io/gh/sitdownkevin/ImageHosting@main/1699260928004.png)

BKAI-IGH NeoPolyp-Small
[Kaggle homepage](https://www.kaggle.com/c/bkai-igh-neopolyp/)

This dataset contains 1200 images (1000 WLI images and 200 FICE images) with fine-grained segmentation annotations. The training set consists of 1000 images, and the test set consists of 200 images. All polyps are classified into neoplastic or non-neoplastic classes denoted by red and green colors, respectively.

![1699260961445](https://cdn.statically.io/gh/sitdownkevin/ImageHosting@main/1699260961445.png)
