---
layout: nodes.liquid
section: ethereum
date: Last Modified
title: 'VRF Best Practices'
permalink: 'docs/vrf/v2/best-practices/'
metadata:
  title: 'Chainlink VRF API Reference'
  description: 'Best pracices for using Chainlink VRF.'
---

{% include 'sections/vrf-v2-common.md' %}

These are example best practices for using Chainlink VRF. To explore more applications of VRF, refer to our [blog](https://blog.chain.link/).

## Getting a random number within a range

If you need to generate a random number within a given range, use [modulo](https://docs.soliditylang.org/en/v0.8.7/types.html#modulo) to define the limits of your range. Below you can see how to get a random number in a range from 1 to 50.

```solidity
function fulfillRandomWords(
  uint256, /* requestId */
  uint256[] memory randomWords
) internal override {
  // Assuming only one random word was requested.
  s_randomRange = (randomWords[0] % 50) + 1;
}
```

## Getting multiple random values

If you want to get multiple random values from a single VRF request, you can request this directly with the `numWords` argument. See the [Get a Random Number](/docs/vrf/v2/examples/get-a-random-number/) guide for an example where one request returns multiple random values.

## Processing simultaneous VRF requests

If you want to have multiple VRF requests processing simultaneously, create a mapping between `requestId` and the response. You might also create a mapping between the `requestId` and the address of the requester to track which address made each request.

```solidity
mapping(uint256 => uint256[]) public s_requestIdToRandomWords;
mapping(uint256 => address) public s_requestIdToAddress;
uint256 public s_requestId;

function requestRandomWords() external onlyOwner returns (uint256) {
  uint256 requestId = COORDINATOR.requestRandomWords(
    keyHash,
    s_subscriptionId,
    requestConfirmations,
    callbackGasLimit,
    numWords
  );
  s_requestIdToAddress[requestId] = msg.sender;

  // Store the latest requestId for this example.
  s_requestId = requestId;

  // Return the requestId to the requester.
  return requestId;
}

function fulfillRandomWords(
    uint256 requestId,
    uint256[] memory randomWords
  ) internal override {
  // You can return the value to the requester,
  // but this example simply stores it.
  s_requestIdToRandomWords[requestId] = randomWords;
}
```

You could also map the `requestId` to an index to keep track of the order in which a request was made.

```solidity
mapping(uint256 => uint256) s_requestIdToRequestIndex;
mapping(uint256 => uint256[]) public s_requestIndexToRandomWords;
uint256 public requestCounter;

function requestRandomWords() external onlyOwner {
  uint256 requestId = COORDINATOR.requestRandomWords(
    keyHash,
    s_subscriptionId,
    requestConfirmations,
    callbackGasLimit,
    numWords
  );
  s_requestIdToRequestIndex[requestId] = requestCounter;
  requestCounter += 1;
}

function fulfillRandomWords(
    uint256 requestId,
    uint256[] memory randomWords
  ) internal override {
  uint256 requestNumber = s_requestIdToRequestIndex[requestId];
  s_requestIndexToRandomWords[requestNumber] = randomWords;
}
```

## Processing VRF responses through different execution paths

If you want to process VRF responses depending on predetermined conditions, you can create an `enum`. When requesting for randomness, map each `requestId` to an enum. This way, you can handle different execution paths in `fulfillRandomWords`. See the following example:

```solidity
{% include 'samples/VRF/VRFv2MultiplePaths.sol' %}
```

<div class="remix-callout">
  <a href="https://remix.ethereum.org/#url=https://docs.chain.link/samples/VRF/VRFv2MultiplePaths.sol" target="_blank" >Open in Remix</a>
  <a href="/docs/conceptual-overview/#what-is-remix">What is Remix?</a>
</div>
