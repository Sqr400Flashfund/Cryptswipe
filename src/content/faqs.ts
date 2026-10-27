export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How does the Cryptswipe Multi-Chain Card work?",
    a: "Cryptswipe links directly to your Trust Wallet, MetaMask, Phantom or any other wallet. When you pay online or tap at a terminal, our decentralized smart liquidity router swaps your selected crypto (BNB, ETH, SOL, BTC, USDC, etc.) into local currency in real time at zero foreign exchange markup.",
  },
  {
    q: "Which cryptocurrencies and networks are supported?",
    a: "Over 100 blockchains, including BNB Chain (BEP-20), Ethereum (ERC-20), Solana (SPL), Bitcoin, Polygon, Arbitrum, Optimism, Base, and Avalanche. Any liquid token can be designated as your funding source.",
  },
  {
    q: "Is there any KYC or ID verification required?",
    a: "Virtual cards up to standard transaction limits can be issued instantly with basic on-chain credential verification. Tier 2 limits for large purchases can be unlocked with streamlined compliance via decentralized zero-knowledge proofs.",
  },
  {
    q: "Are there any foreign transaction (FX) fees?",
    a: "No. Cryptswipe provides 0% foreign transaction fees. All currency conversions occur at interbank spot rates with zero hidden markups.",
  },
  {
    q: "Does Cryptswipe work with every wallet?",
    a: "Yes. Any wallet that supports WalletConnect or has a built-in dApp browser works. For the smoothest experience, open cryptswipe.com inside your wallet's browser (Trust Wallet, MetaMask Mobile, Phantom, OKX, Binance Web3) and your wallet connects in one tap.",
  },
  {
    q: "Does Cryptswipe hold my crypto?",
    a: "No. Cryptswipe is non-custodial. Your funds stay in your wallet. A swap and settlement is executed only at the moment you make a purchase, for exactly that amount.",
  },
  {
    q: "Can I use it for subscriptions like Netflix, Spotify, ChatGPT or AWS?",
    a: "Yes. Cryptswipe cards support recurring billing. Set a spending limit per card so a subscription can never pull more than you allow.",
  },
  {
    q: "Can I add the card to Apple Pay or Google Pay?",
    a: "Yes. Once issued, add your Cryptswipe virtual card to Apple Pay or Google Pay for in-store tap payments.",
  },
  {
    q: "How fast do I get my card?",
    a: "Typically under 60 seconds after connecting your wallet and choosing your funding network.",
  },
  {
    q: "What are the limits?",
    a: "Standard tier: instant issuance with daily and monthly caps shown on the Fees page. Tier 2 raises limits for larger purchases. Limits are per card, and you can create multiple cards.",
  },
  {
    q: "What does it cost?",
    a: "Card issuance is free. There is no monthly fee. A small, transparent network/swap fee is shown before every transaction. 0% FX.",
  },
  {
    q: "What happens if the price of my crypto moves during a purchase?",
    a: "The conversion is locked at the moment of authorisation. You see the exact amount of crypto that will be used before you confirm.",
  },
  {
    q: "Can I freeze or delete a card?",
    a: "Instantly, from your dashboard. Freeze, unfreeze, set limits, or delete and reissue a new card number at any time.",
  },
  {
    q: "Is Cryptswipe safe?",
    a: "Yes. Non-custodial architecture, per-transaction wallet signature, dynamic CVV, 3-D Secure, encrypted card data, and no seed phrase is ever requested. If anyone asks for your seed phrase claiming to be Cryptswipe, it is a scam.",
  },
  {
    q: "Which countries are supported?",
    a: "Cryptswipe virtual cards can be used at online merchants worldwide. Availability of the card program by region is listed on the Supported Networks page.",
  },
];

export const homeFaqs = faqs.slice(0, 6);
