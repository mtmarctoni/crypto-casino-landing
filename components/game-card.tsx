"use client"

import { useState } from "react"
import { Play, TrendingUp, Coins } from "lucide-react"
import { useWalletConnection } from "@/hooks/use-wallet-connection"
import type { Game } from "@/types"
import Image from "next/image"

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { isConnected, balance, formatBalance, openModal } = useWalletConnection()

  const handlePlayClick = () => {
    if (!isConnected) {
      openModal()
      return
    }

    // Check if user has sufficient balance
    const minBetAmount = Number.parseFloat(game.minBet.split(" ")[0])
    const userBalance = Number.parseFloat(formatBalance(balance) || "0")

    if (userBalance < minBetAmount) {
      // Show insufficient balance message
      alert("Insufficient balance to play this game")
      return
    }

    // Proceed to game
    console.log(`Playing ${game.name}`)
  }

  return (
    <div
      className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-400/10 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={game.image || "/placeholder.png"}
          alt={game.name}
          width={400}
          height={200}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

        {/* Play button overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={handlePlayClick}
            className="bg-green-500 hover:bg-green-400 text-white rounded-full p-4 transition-all duration-200 hover:scale-110"
          >
            <Play className="w-8 h-8 fill-current" />
          </button>
        </div>

        {/* Connection status indicator */}
        {!isConnected && (
          <div className="absolute top-3 right-3 bg-red-500/20 border border-red-500/50 rounded-full px-2 py-1">
            <span className="text-red-400 text-xs font-medium">Wallet Required</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{game.name}</h3>
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">{game.category}</span>
        </div>

        <p className="text-gray-400 text-sm mb-4">{game.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-gray-400">
            <Coins className="w-4 h-4" />
            <span className="text-xs">Min: {game.minBet}</span>
          </div>
          <div className="flex items-center space-x-1 text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs">Max: {game.maxWin}</span>
          </div>
        </div>

        <button
          onClick={handlePlayClick}
          className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg ${isConnected
            ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white hover:shadow-green-400/25"
            : "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
            }`}
        >
          {isConnected ? "Play Now" : "Connect Wallet to Play"}
        </button>
      </div>
    </div>
  )
}
