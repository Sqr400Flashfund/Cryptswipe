import { Zap, Layers, Globe2, Repeat, AppWindow, KeyRound, ShieldCheck, Lock, Snowflake, RefreshCcw, BadgeCheck, EyeOff, PenLine, Tv, ShoppingBag, Code2, Plane, Gamepad2, Sparkles } from "lucide-react";

export const wallets = ["MetaMask", "Trust Wallet", "Phantom", "Coinbase Wallet", "Rainbow", "OKX Wallet", "Binance Web3", "Ledger", "WalletConnect"];

export const steps = [
  { title: "Connect your wallet", body: "Tap Apply for Card and connect any wallet through WalletConnect or your wallet's in-app browser. No new account to fund." },
  { title: "Choose your network", body: "Pick the chain and token you want to spend from: SOL, ETH, BNB, USDC, USDT, BTC and more." },
  { title: "Get your virtual card", body: "Card details are issued instantly. Add it to Apple Pay or Google Pay, or use it online right away." },
];

export const features = [
  { icon: Zap, title: "Instant virtual cards", body: "Card number, expiry and CVV in under 60 seconds. Make as many cards as you need." },
  { icon: Layers, title: "Multi-chain funding", body: "Spend from 100+ networks. Switch your funding token any time, per card." },
  { icon: Globe2, title: "0% foreign transaction fees", body: "Conversions at interbank spot rate. No FX markup, in any currency." },
  { icon: Repeat, title: "Subscriptions & recurring payments", body: "Streaming, SaaS, AI tools. Set a cap per card so nothing pulls more than you allow." },
  { icon: AppWindow, title: "Spend from your wallet browser", body: "Open cryptswipe.com inside Trust Wallet, MetaMask or Phantom and connect in one tap." },
  { icon: KeyRound, title: "Non-custodial by design", body: "Your crypto stays in your wallet until the moment you pay. We never hold your keys." },
];

export const securityPoints = [
  { icon: KeyRound, title: "Non-custodial", body: "Funds stay in your wallet until the moment of spend." },
  { icon: PenLine, title: "Per-transaction authorisation", body: "Every payment is signed by your wallet." },
  { icon: Snowflake, title: "Freeze & unfreeze", body: "Lock a card instantly from your dashboard." },
  { icon: RefreshCcw, title: "Dynamic CVV", body: "Rotating security codes stop reused card data." },
  { icon: BadgeCheck, title: "3-D Secure", body: "An extra check on supported online checkouts." },
  { icon: Lock, title: "End-to-end encryption", body: "Card data is encrypted in transit and at rest." },
  { icon: EyeOff, title: "No seed phrase. Ever.", body: "We will never ask for it. Anyone who does is a scammer." },
  { icon: ShieldCheck, title: "Spending limits", body: "Per-card caps you control, changeable any time." },
];

export const useCases = [
  { icon: Tv, title: "Streaming subscriptions", body: "Video, music and podcast plans billed monthly." },
  { icon: ShoppingBag, title: "Online shopping", body: "Any store that takes Visa or Mastercard online." },
  { icon: Code2, title: "SaaS & cloud tools", body: "Hosting, design tools, developer platforms." },
  { icon: Plane, title: "Flights & hotels", body: "Book travel in any currency at 0% FX." },
  { icon: Gamepad2, title: "Gaming", body: "Game stores, in-game purchases and passes." },
  { icon: Sparkles, title: "AI tools", body: "Chat assistants, image models and API credits." },
];

export const comparison = {
  columns: ["Cryptswipe", "Traditional crypto card", "Selling crypto to a bank"],
  rows: [
    { label: "Time to get a card", cells: ["Under 60 seconds", "Days to weeks", "No card — 1–5 day transfer"] },
    { label: "KYC friction", cells: ["Basic on-chain check for standard tier", "Full ID + proof of address", "Full bank + exchange KYC"] },
    { label: "FX fees", cells: ["0%", "1–3% typical", "Spread + bank FX fees"] },
    { label: "Custody", cells: ["Non-custodial — your wallet", "Custodial — deposit to issuer", "Custodial — exchange + bank"] },
    { label: "Supported chains", cells: ["100+ networks", "A handful of assets", "Whatever the exchange lists"] },
    { label: "Subscriptions", cells: [true, true, null] },
  ] as { label: string; cells: (string | boolean | null)[] }[],
};

export const networks = [
  "Ethereum", "BNB Chain", "Solana", "Bitcoin", "Polygon", "Arbitrum", "Optimism", "Base", "Avalanche", "TON",
  "Tron", "Sui", "Aptos", "Linea", "zkSync", "Scroll", "Fantom", "Cronos", "Near", "Cosmos",
];
export const networkType: Record<string, "EVM" | "Layer 2" | "Non-EVM"> = {
  Ethereum: "EVM", "BNB Chain": "EVM", Polygon: "EVM", Avalanche: "EVM", Fantom: "EVM", Cronos: "EVM",
  Arbitrum: "Layer 2", Optimism: "Layer 2", Base: "Layer 2", Linea: "Layer 2", zkSync: "Layer 2", Scroll: "Layer 2",
  Solana: "Non-EVM", Bitcoin: "Non-EVM", TON: "Non-EVM", Tron: "Non-EVM", Sui: "Non-EVM", Aptos: "Non-EVM", Near: "Non-EVM", Cosmos: "Non-EVM",
};
export const tokens = ["ETH", "BNB", "SOL", "BTC", "USDC", "USDT", "DAI", "MATIC", "AVAX", "ARB", "OP"];
