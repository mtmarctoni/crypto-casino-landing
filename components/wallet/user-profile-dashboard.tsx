"use client"

import { useState } from "react"
import { Wallet, TrendingUp, TrendingDown, Clock, Copy, ExternalLink, RefreshCw } from "lucide-react"
import { useWalletConnection } from "@/hooks/use-wallet-connection"

interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "win" | "loss"
  amount: string
  game?: string
  timestamp: Date
  hash: string
}

export default function UserProfileDashboard() {
  const { address, balance, ensName, formatAddress, formatBalance } = useWalletConnection()

  // Simulated transaction history
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "deposit",
      amount: "0.5",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      hash: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
      id: "2",
      type: "win",
      amount: "0.75",
      game: "Coin Flip",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      hash: "0xabcdef1234567890abcdef1234567890abcdef12",
    },
    {
      id: "3",
      type: "loss",
      amount: "0.25",
      game: "Dice",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      hash: "0x567890abcdef1234567890abcdef1234567890ab",
    },
  ])

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <TrendingDown className="w-4 h-4 text-green-400" />
      case "withdrawal":
        return <TrendingUp className="w-4 h-4 text-blue-400" />
      case "win":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "loss":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
      case "win":
        return "text-green-400"
      case "withdrawal":
        return "text-blue-400"
      case "loss":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  if (!address) return null

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{ensName || "Wallet Profile"}</h1>
              <div className="flex items-center space-x-2 text-gray-400">
                <span>{formatAddress(address)}</span>
                <button onClick={copyAddress} className="hover:text-white transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open(`https://etherscan.io/address/${address}`, "_blank")}
                  className="hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-green-400/50 rounded-xl px-4 py-2 transition-all duration-200">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4">
            <div className="text-gray-400 text-sm mb-1">Total Balance</div>
            <div className="text-2xl font-bold text-white">{formatBalance(balance)} ETH</div>
            <div className="text-green-400 text-sm">
              ≈ ${(Number.parseFloat(formatBalance(balance) || "0") * 2500).toFixed(2)}
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4">
            <div className="text-gray-400 text-sm mb-1">Total Wagered</div>
            <div className="text-2xl font-bold text-white">1.25 ETH</div>
            <div className="text-blue-400 text-sm">≈ $3,125.00</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4">
            <div className="text-gray-400 text-sm mb-1">Net Profit</div>
            <div className="text-2xl font-bold text-green-400">+0.15 ETH</div>
            <div className="text-green-400 text-sm">≈ +$375.00</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-400/25">
            Deposit Funds
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-400/25">
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {getTransactionIcon(tx.type)}
                <div>
                  <div className="text-white font-medium capitalize">
                    {tx.type} {tx.game && `- ${tx.game}`}
                  </div>
                  <div className="text-gray-400 text-sm">{tx.timestamp.toLocaleString()}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${getTransactionColor(tx.type)}`}>
                  {tx.type === "deposit" || tx.type === "win" ? "+" : "-"}
                  {tx.amount} ETH
                </div>
                <button
                  onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank")}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  View TX
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
