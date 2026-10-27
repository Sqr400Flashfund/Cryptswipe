import type { Post } from "../types";

const post: Post = {
  slug: "crypto-card-metamask",
  title: "How to Use a Crypto Card With MetaMask",
  description:
    "Turn MetaMask into a MetaMask card: link your wallet to a virtual card, fund it from Ethereum, Base, Arbitrum or Linea, and spend online. Full guide here.",
  keyword: "metamask card",
  category: "Guides",
  date: "2026-02-19",
  updated: "2026-03-02",
  readMinutes: 7,
  heroAlt: "MetaMask wallet approving a payment on a virtual card used as a MetaMask card",
  takeaways: [
    "A MetaMask card is a virtual card that spends straight from your MetaMask wallet.",
    "Connect via MetaMask Mobile's browser or the MetaMask browser extension.",
    "Fund from Ethereum Layer 2s like Base, Arbitrum or Linea to keep gas low.",
    "Every payment needs a MetaMask signature, so nothing moves without you.",
  ],
  body: `To use a MetaMask card, link your MetaMask wallet to a wallet-linked virtual card like Cryptswipe. On mobile, open MetaMask's browser and visit cryptswipe.com; on desktop, connect with the MetaMask extension. Pick a funding token, such as ETH or USDC on a Layer 2, and your card is ready in under a minute. Each payment is approved in MetaMask.

Here's how to set it up and how to keep gas costs down.

## What a MetaMask card means

MetaMask is a self-custody wallet. Your keys live on your device.

A MetaMask card is a card that spends from that wallet. Cryptswipe links a virtual card to your MetaMask address. At checkout, MetaMask signs a transaction for the purchase amount and the liquidity router converts it to the merchant's currency.

Your funds don't move to a third party first.

## Setting up your MetaMask card on mobile

### Step 1: Open the MetaMask browser

In MetaMask Mobile, tap the Browser icon in the bottom menu.

### Step 2: Visit cryptswipe.com

Enter cryptswipe.com and tap **Apply for Card**.

### Step 3: Connect

Choose MetaMask when prompted, then approve the connection. Only your public address is shared.

### Step 4: Choose a network and token

Pick what funds your card. Good MetaMask options:

- **USDC on Base or Arbitrum** for low fees and stable value.
- **ETH on Linea, Base, Optimism or Arbitrum** for cheaper ETH spending.
- **ETH or USDT on Ethereum mainnet** for larger purchases.
- **BNB or USDT on BNB Chain** if you use it in MetaMask.

### Step 5: Get your card

Your card details appear in under 60 seconds. Use them online or add the card to Apple Pay or Google Pay.

## Setting up on desktop with the MetaMask extension

1. Open cryptswipe.com in Chrome, Brave, Firefox or Edge.
2. Click **Apply for Card**.
3. Select MetaMask. The extension pops up.
4. Approve the connection and follow the same steps as mobile.

You can also use WalletConnect to connect MetaMask Mobile by scanning a QR code.

## Keeping gas low on your MetaMask card

Ethereum mainnet gas can be expensive for small purchases. Layer 2 networks fix that.

| Network | Gas level | Best for |
|---|---|---|
| Ethereum mainnet | Higher | Large purchases |
| Base | Very low | Everyday spending |
| Arbitrum | Low | Everyday spending |
| Optimism | Low | Everyday spending |
| Linea | Low | MetaMask-native users |
| Polygon | Very low | Small purchases |

If your funds are on mainnet and you spend often, moving a spending balance to a Layer 2 can pay for itself. For one-off big purchases, mainnet is fine.

The swap and network fee is always shown before you confirm. See the [fees page](/fees) for everything else: $0 issuance, $0 monthly, 0% FX.

## Paying with your MetaMask card

1. Enter your card at checkout.
2. MetaMask shows a signature request with the exact token amount.
3. Confirm. The conversion is locked at authorisation.
4. The merchant is paid in their currency.

That's it. Your remaining balance stays in MetaMask.

## Security tips for MetaMask users

MetaMask phishing is common. Protect yourself.

- **Never enter your Secret Recovery Phrase** on any website. Cryptswipe will never ask for it.
- **Bookmark cryptswipe.com** and use the bookmark.
- **Read every signature request.** Check the amount and the network.
- **Limit token approvals.** Approve only what's needed.
- **Use per-card limits** and freeze cards you're not using.

Read our full [security deep-dive](/blog/is-crypto-card-safe) and the [security page](/security).

## Using a hardware wallet with MetaMask

If you connect a Ledger through MetaMask, the flow is the same. You'll confirm each payment on the device. It's slower, but very secure for larger balances.

## Troubleshooting

### MetaMask is on the wrong network

Switch networks in MetaMask to match the funding network you chose.

### The transaction failed

Check you have enough of the funding token and enough of the network's gas token, like ETH on Base.

### The connection didn't appear

Refresh the page, unlock MetaMask, and try again.

## Spend from MetaMask anywhere

Your MetaMask wallet can pay for subscriptions, shopping and travel without selling to an exchange. Using Trust Wallet too? See [how to use a crypto card with Trust Wallet](/blog/crypto-card-trust-wallet). Want the bigger picture? Read [non-custodial crypto cards explained](/blog/non-custodial-crypto-card).`,
};

export default post;
