// lib/wagmi-config.ts
import { Config, createConfig, http } from 'wagmi'
import { mainnet, base, arbitrum } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

let config: Config | null = null

export function getWagmiConfig() {
  if (config) return config

  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

  if (!projectId) {
    throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required')
  }

  config = createConfig({
    chains: [mainnet, base, arbitrum],
    connectors: [
      injected(),
      metaMask(),
      walletConnect({
        projectId,
        metadata: {
          name: 'Crypto Gambling Platform',
          description: 'Best crypto casino',
          url: 'https://tudominio.com',
          icons: ['https://tudominio.com/icon.png']
        }
      }),
    ],
    transports: {
      [mainnet.id]: http(),
      [base.id]: http(),
      [arbitrum.id]: http(),
    },
  })

  return config
}

// Solo para uso en server components si es necesario
export const wagmiConfig = typeof window !== 'undefined' ? getWagmiConfig() : null
