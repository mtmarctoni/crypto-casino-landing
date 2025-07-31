"use client"

import type React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider, type Config } from "wagmi"
import { getWagmiConfig } from "@/lib/wagmi-config"
import { useEffect, useState } from "react"

export function WagmiProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }))

  useEffect(() => {
    // Solo crear la config cuando estemos en el cliente
    if (typeof window !== 'undefined') {
      setWagmiConfig(getWagmiConfig())
      setMounted(true)
    }
  }, [])

  // No renderizar nada hasta que esté montado en el cliente Y config esté lista
  if (!mounted || !wagmiConfig) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-green-400">Loading crypto wallet...</div>
      </div>
    )
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
