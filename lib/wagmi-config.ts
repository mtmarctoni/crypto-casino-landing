import { createConfig, http } from "wagmi"
import { mainnet, base, arbitrum } from "wagmi/chains"
import { metaMask, walletConnect, injected, coinbaseWallet } from "wagmi/connectors"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!

export const wagmiConfig = createConfig({
  chains: [mainnet, base, arbitrum],
  connectors: [
    metaMask(),
    walletConnect({
      projectId,
      metadata: {
        name: "CryptoGamble",
        description: "The Future of Crypto Gambling",
        url: "https://cryptogamble.com",
        icons: ["https://cryptogamble.com/icon.png"],
      },
    }),
    coinbaseWallet({
      appName: "CryptoGamble",
      appLogoUrl: "https://cryptogamble.com/icon.png",
    }),
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
  },
})
