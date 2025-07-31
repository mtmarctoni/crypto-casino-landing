
"use client"

import { useState } from "react"
import { Connector, useConnect } from "wagmi"
import { X, Wallet, Shield } from "lucide-react"
import type { WalletOption } from "@/types"
import Image from "next/image"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null)
  const { connect, connectors, error, isPending } = useConnect()

  const walletOptions: WalletOption[] = [
    {
      name: "MetaMask",
      icon: "/icons/metamask.svg",
      description: "Connect using MetaMask wallet",
    },
    {
      name: "WalletConnect",
      icon: "/icons/wallet-connect.svg",
      description: "Scan with WalletConnect to connect",
    },
    {
      name: "Coinbase Wallet",
      icon: "/icons/coinbase.svg",
      description: "Connect with Coinbase Wallet",
    },
  ]

  const handleConnect = async (walletName: string) => {
    setConnecting(walletName)
    try {
      // Find the connector by name
      const connector = connectors.find((c: Connector) => c.name === walletName)
      if (!connector) throw new Error("Connector not found")
      await connect({ connector })
      onClose()
    } catch (e) {
      // Optionally handle error
      console.error(e)
    } finally {
      setConnecting(null)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Connect Wallet</h2>
          <p className="text-gray-400">Choose your preferred wallet to get started</p>
        </div>

        <div className="space-y-3">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.name)}
              disabled={connecting !== null || isPending}
              className="w-full p-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl transition-all duration-200 hover:border-green-400/50 group disabled:opacity-50"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={wallet.icon || "/placeholder.png"}
                  alt={wallet.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg"
                />
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors">
                    {connecting === wallet.name ? "Connecting..." : wallet.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{wallet.description}</p>
                </div>
                {connecting === wallet.name && (
                  <div className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            </button>
          ))}
          {error && (
            <div className="text-red-500 text-sm mt-2">{error.message}</div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-center space-x-2 text-blue-400 mb-2">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Secure Connection</span>
          </div>
          <p className="text-sm text-gray-400">
            Your wallet connection is encrypted and secure. We never store your private keys.
          </p>
        </div>
      </div>
    </div>
  )
}
