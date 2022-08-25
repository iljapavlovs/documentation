---
layout: nodes.liquid
section: ethereum
date: Last Modified
title: "Proof of Reserve Feeds"
permalink: "docs/data-feeds/proof-of-reserve/"
whatsnext: {
  "Get the latest price of a Data Feed":"/docs/get-the-latest-price/",
  "Learn more about API references for using Data Feeds":"/docs/price-feeds-api-reference/",
  "Retrieve contract addresses to use Data Feeds":"/docs/reference-contracts/"
}
metadata:
  title: "Introduction to Data Feeds"
  description: "Add data to your smart contracts and applications. Chainlink data feeds include BTC/USD, BTC/ETH, ETH/USD and more!"
---

Proof of reserve feeds provide the status of the reserves that back several asset tokens on-chain. These feeds operate the same way as other Chainlink Data Feeds. To learn how to use these feeds, see the [Using Data Feeds](/docs/get-the-latest-price/) guide.

To find a list of available proof of reserve feeds, see [Proof of Reserve Feed Addresses](/docs/data-feeds/proof-of-reserve/addresses/).

**Topics**

- [Types of Proof of Reserve feeds](#types-of-proof-of-reserve-feeds)

## Types of Proof of Reserve feeds

Reserves are available for both cross-chain assets and off-chain assets. Token issuers prove the reserves for their assets through several different methods. 

- Cross-chain assets:
  - Wallet address manager with ownership verification: The project uses the wallet address manager contract and ownership of all addresses is verified.
  - Wallet address manager: The project uses the wallet address manager contract and self-attests to which addresses they own.
  - Self-attested wallet API: The project attests which addresses they own through a self-hosted API.
- Off-chain assets:
  - Third-party API: A third-party audits or verifies the reserves and provides that data through an API.
  - Custodian API: Reserve status are read directly from a bank or custodian API.
  - Self-attested API: Reserve status is read from an API that the token issuer hosts.