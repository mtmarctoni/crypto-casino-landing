import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { WagmiProviders } from "@/components/providers/wagmi-provider"

export const metadata: Metadata = {
  title: 'Crypto Casino | Web3 Gambling Platform',
  description: 'Play provably fair crypto casino games. Connect your wallet and start winning with cryptocurrency.',
  keywords: ['crypto casino', 'web3 gambling', 'blockchain games', 'provably fair'],

  openGraph: {
    title: 'Crypto Casino | Web3 Gambling Platform',
    description: 'Play provably fair crypto casino games with cryptocurrency.',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Casino | Web3 Gambling Platform',
    description: 'Play provably fair crypto casino games with cryptocurrency.',
  },

  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style> */}
      </head>
      <body>
        <WagmiProviders>{children}</WagmiProviders>
      </body>
    </html>
  )
}
