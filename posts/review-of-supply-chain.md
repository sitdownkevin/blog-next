---
title: Review of Supply Chain
tags: SCU
create_date: null
update_date: null
---

## Economic Lot Size Model

**Total cost**

$$
C_t=K+\frac{hTQ}{2}
$$

**Average inventory level**

$$
\frac Q2
$$

**Cycle time**

$$
T=\frac{Q}{D}
$$

**Average total cost per unit time**

$$
\frac{C_t}{T}=\frac KT+\frac{hQ}{2}=\frac{KD}{Q}+\frac{hQ}{2}
$$

**Economic Order Quantity (EOQ)**

$$
Q=\arg\min_Q \frac{C_t}{T}=\arg\min_Q \frac{KD}{Q}+\frac{hQ}{2}=\sqrt{\frac{2KD}{h}}
$$

## Single Period Models

- Fixed cost $100,000
- Variable cost $80 per unit
- Sale price $125
- Salvage price $20

**Scenario I**

- Produce 10,000 units
- Sell 12,000 units (Demand)
- Probability 27%

> $125(10,000)-80(10,000)-100,000=\$350,000$

**Scenarios II**

- Produce 10,000 units
- Sell 8,000 units
- Probability 11%

> $125(8,000)+20(2,000)-80(10,000)-100,000=\$140,000$

**Relationship between Optimal Quantity and Average Demand**

- Marginal Profit > Marginal Cost => Optimal Quantity >
  Average Demand
- Marginal Profit < Marginal Cost => Optimal Quantity <
  Average Demand

**Risk-Reward Tradeoffs**

- Minimal Ordering Quantity (MOQ)
- Minimal Packing Quantity (MPQ)

## Initial Inventory

**Trade-off between**

- Using on-hand inventory to meet demand and
  avoid paying fixed production cost: need
  sufficient inventory stock
- Paying the fixed cost of production and avoid
  lose of sales

# Multiple Order Opportunities

## Continuous Review Policy ((Q,R) Policy)

- Average daily demand, $AVG$
- Standard deviation of daily demand, $STD$
- Replenishment lead time, $L$
- Holding cost, $h$
- Service level, $\alpha$

**Average demand during lead time**

$$
L\times AVG
$$

**Safety stock**

$$
z\times STD\times\sqrt L
$$

**Reorder level**

$$
R=L\times AVG + z\times STD\times \sqrt L
$$

**Average Inventory**

$$
\frac Q2+z\times STD\times\sqrt{L}
$$

**Order Quantity**

$$
Q=\sqrt{\frac{2K\times AVG}{h}}
$$

> Approximation from EOQ, $Q^{\star}=\sqrt{\frac{2KD}{h}}$

## Periodic Review Policy

### Short Intervals ((s,S) Policy)

Same as (Q, R) Policy

### Longer Intervals (Base-stock level policy)

> 低价商品 (Nails and Screw)

- Average daily demand, $AVG$
- Standard deviation of daily demand, $STD$
- Lead time $L$
- Length of the review period $r$
- Service level, $\alpha$

**Average demand during an interval of $r+L$**

$$
(r+L)\times AVG
$$

**Base-stock level**

$$
(r+L)\times AVG+z\times STD\times\sqrt{r+L}
$$

**Average Inventory**

$$
r\times AVG+ \mathrm{safety\ stock}
$$

# Make-to-Order Demo

## Global Optimization

**One Entity**

- Sale price $125
- Salvage value $20
- Fixed cost $0
- Variable cost $35

> Marginal profit \$90, marginal cost \$15
>
> 16,000 => $1,014,500

## 2 Stage Example

**2 Stages** (2 entities)

- Buyer (retailer)
- Supplier (manufacturer)

**Buyer Information**

- Sale price $125
- Wholesale price $80
- Salvage price $20

> Marginal profit \$45, marginal cost \$60
>
> 12,000 => $470,700

**Supplier Information**

- Fixed cost $100,000
- Variable cost $35 per unit

> $440,000

## Buy-Back Contract

**Buyer Information**

- Buy-back price $55

> Marginal profit \$45, marginal cost \$25
>
> 14,000 => \$513,800

**Supplier Information**

> $471,900

## Revenue-Sharing Contract

**Buyer Information**

- Wholesale price $60
- 15% revenue to Supplier

> 14,000 => $504,325

**Supplier Information**

> $481,375

# Make-to-Stock Demo

## Global Optimization

**One Entity**

- Sale price $125
- Salvage price $20
- Fixed cost \$0
- Variable cost \$55

> Marginal profit \$70, marginal cost \$35
>
> 14,000 => \$705,700

## 2-Stage Example

**2 Stage**

- Buyer (distributor)
- Supplier (manufacturer)

**Buyer Information**

- Sale price $125
- Wholesale price $80

> $510,300

**Supplier Information**

- Fixed cost $100,000
- Variable cost $55 per unit
- Salvage price $20

> Marginal profit \$25, marginal cost \$60
>
> 12,000 => $160,400

## Pay-Back Contract

**Buyer Information**

> $525,420

**Supplier Information**

- Pay-Back price $18

> Marginal profit \$25, marginal cost \$17
>
> 14,000 => $180,280

## Cost-Sharing Contract

**Buyer Information**

> $523,320

**Supplier Information**

- Wholesale price $62

- Return 33% of the cost

> 14,000 => \$182.380
