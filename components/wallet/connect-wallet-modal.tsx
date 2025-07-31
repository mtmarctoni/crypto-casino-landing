"use client"

import { X, Wallet, Shield, AlertCircle, Loader2 } from "lucide-react"
import { useWalletConnection } from "@/hooks/use-wallet-connection"
import Image from "next/image"

const walletIcons: Record<string, string> = {
  MetaMask: "/placeholder.svg?height=40&width=40&text=MM",
  WalletConnect: "/placeholder.svg?height=40&width=40&text=WC",
  "Coinbase Wallet": "/placeholder.svg?height=40&width=40&text=CB",
  Injected: "/placeholder.svg?height=40&width=40&text=INJ",
}

const walletDescriptions: Record<string, string> = {
  MetaMask: "Connect using MetaMask wallet",
  WalletConnect: "Scan with WalletConnect to connect",
  "Coinbase Wallet": "Connect with Coinbase Wallet",
  Injected: "Connect with browser wallet",
}

export default function ConnectWalletModal() {
  const { isModalOpen, closeModal, connectors, handleConnect, connectingConnector, isConnecting, error } =
    useWalletConnection()

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 w-full max-w-md relative animate-in fade-in-0 zoom-in-95 duration-300">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          disabled={isConnecting}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Connect Wallet</h2>
          <p className="text-gray-400">Choose your preferred wallet to get started</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex items-center space-x-2 text-red-400 mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">Connection Failed</span>
            </div>
            <p className="text-sm text-gray-400">{error.message || "Failed to connect wallet. Please try again."}</p>
          </div>
        )}

        <div className="space-y-3 mb-6">
          {connectors.map((connector) => {
            const isConnectingThis = connectingConnector === connector.name
            const isDisabled = isConnecting

            return (
              <button
                key={connector.uid}
                onClick={() => handleConnect(connector)}
                disabled={isDisabled}
                className="w-full p-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl transition-all duration-200 hover:border-green-400/50 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={walletIcons[connector.name] || "/placeholder.svg?height=40&width=40&text=W"}
                      alt={connector.name}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                    {isConnectingThis && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-green-400 animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors">
                      {connector.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {walletDescriptions[connector.name] || "Connect with this wallet"}
                    </p>
                  </div>
                  {isConnectingThis && <div className="text-green-400 text-sm font-medium">Connecting...</div>}
                </div>
              </button>
            )
          })}
        </div>

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
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
