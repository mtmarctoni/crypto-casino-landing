"use client"

import { useState, useEffect } from "react"
import { Wallet, Shield, Zap, TrendingUp, Users, Award, ChevronDown, Menu, X, Coins } from "lucide-react"
import GameCard from "@/components/game-card"
import type { Game, Feature } from "@/types"
import { useWalletConnection } from "@/hooks/use-wallet-connection"
import WalletButton from "@/components/wallet/wallet-button"
import ConnectWalletModal from "@/components/wallet/connect-wallet-modal"
import WalletModal from "@/components/wallet/wallet-modal" // Declare WalletModal here

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { isConnected, isConnecting, openModal } = useWalletConnection()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const games: Game[] = [
    {
      id: "1",
      name: "Coin Flip",
      description: "Classic heads or tails with crypto rewards",
      image: "/placeholder.svg?height=200&width=300&text=Coin+Flip",
      category: "classic",
      minBet: "0.001 ETH",
      maxWin: "10 ETH",
    },
    {
      id: "2",
      name: "Mines",
      description: "Navigate the minefield for explosive wins",
      image: "/placeholder.svg?height=200&width=300&text=Mines",
      category: "classic",
      minBet: "0.005 ETH",
      maxWin: "50 ETH",
    },
    {
      id: "3",
      name: "Crash",
      description: "Watch the multiplier soar, cash out before it crashes",
      image: "/placeholder.svg?height=200&width=300&text=Crash",
      category: "crash",
      minBet: "0.01 ETH",
      maxWin: "100 ETH",
    },
    {
      id: "4",
      name: "Dice",
      description: "Roll the dice and predict the outcome",
      image: "/placeholder.svg?height=200&width=300&text=Dice",
      category: "classic",
      minBet: "0.001 ETH",
      maxWin: "25 ETH",
    },
    {
      id: "5",
      name: "Roulette",
      description: "European roulette with crypto betting",
      image: "/placeholder.svg?height=200&width=300&text=Roulette",
      category: "table",
      minBet: "0.01 ETH",
      maxWin: "35 ETH",
    },
    {
      id: "6",
      name: "Blackjack",
      description: "Beat the dealer in this classic card game",
      image: "/placeholder.svg?height=200&width=300&text=Blackjack",
      category: "table",
      minBet: "0.005 ETH",
      maxWin: "20 ETH",
    },
    {
      id: "7",
      name: "Hi-Lo",
      description: "Guess if the next card is higher or lower",
      image: "/placeholder.svg?height=200&width=300&text=Hi-Lo",
      category: "classic",
      minBet: "0.001 ETH",
      maxWin: "15 ETH",
    },
    {
      id: "8",
      name: "Plinko",
      description: "Drop the ball and watch it bounce to riches",
      image: "/placeholder.svg?height=200&width=300&text=Plinko",
      category: "lottery",
      minBet: "0.001 ETH",
      maxWin: "1000 ETH",
    },
    {
      id: "9",
      name: "Keno",
      description: "Pick your lucky numbers and win big",
      image: "/placeholder.svg?height=200&width=300&text=Keno",
      category: "lottery",
      minBet: "0.001 ETH",
      maxWin: "500 ETH",
    },
    {
      id: "10",
      name: "Limbo",
      description: "How low can you go? Higher multipliers, higher risk",
      image: "/placeholder.svg?height=200&width=300&text=Limbo",
      category: "classic",
      minBet: "0.001 ETH",
      maxWin: "∞",
    },
  ]

  const features: Feature[] = [
    {
      icon: "zap",
      title: "Instant Payouts",
      description: "Withdraw your winnings instantly to your crypto wallet with zero delays",
    },
    {
      icon: "shield",
      title: "Provably Fair",
      description: "Every game result is cryptographically verifiable and completely transparent",
    },
    {
      icon: "coins",
      title: "Multi-Crypto Support",
      description: "Play with Bitcoin, Ethereum, and 20+ other cryptocurrencies",
    },
    {
      icon: "users",
      title: "Community Driven",
      description: "Join thousands of players in our active Discord community",
    },
    {
      icon: "award",
      title: "VIP Rewards",
      description: "Earn exclusive bonuses and perks as you level up your account",
    },
    {
      icon: "trending-up",
      title: "High RTP",
      description: "Industry-leading return-to-player rates across all our games",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrollY > 50 ? "bg-gray-950/90 backdrop-blur-xl border-b border-gray-800" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CG</span>
              </div>
              <span className="text-xl font-bold">CryptoGamble</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("games")} className="hover:text-green-400 transition-colors">
                Games
              </button>
              <button onClick={() => scrollToSection("features")} className="hover:text-green-400 transition-colors">
                Features
              </button>
              <button onClick={() => scrollToSection("cta")} className="hover:text-green-400 transition-colors">
                Get Started
              </button>
              {isConnected ? (
                <WalletButton />
              ) : (
                <button
                  onClick={openModal}
                  disabled={isConnecting}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 px-6 py-2 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-green-400/25 disabled:opacity-50 flex items-center space-x-2"
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4" />
                      <span>Connect Wallet</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-b border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("games")}
                className="block w-full text-left hover:text-green-400 transition-colors"
              >
                Games
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left hover:text-green-400 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("cta")}
                className="block w-full text-left hover:text-green-400 transition-colors"
              >
                Get Started
              </button>
              {isConnected ? (
                <div className="pt-2">
                  <WalletButton />
                </div>
              ) : (
                <button
                  onClick={openModal}
                  disabled={isConnecting}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4" />
                      <span>Connect Wallet</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            The Future of
            <br />
            Crypto Gambling
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience provably fair gaming with instant payouts. Play with Bitcoin, Ethereum, and 20+ cryptocurrencies
            on the most trusted platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            {isConnected ? (
              <button
                onClick={() => scrollToSection("games")}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 hover:shadow-2xl hover:shadow-green-400/25 hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Start Playing Now</span>
              </button>
            ) : (
              <button
                onClick={openModal}
                disabled={isConnecting}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 hover:shadow-2xl hover:shadow-green-400/25 hover:-translate-y-1 flex items-center space-x-2 disabled:opacity-50"
              >
                <Wallet className="w-6 h-6" />
                <span>{isConnecting ? "Connecting..." : "Connect Wallet & Play"}</span>
              </button>
            )}
            <button
              onClick={() => scrollToSection("games")}
              className="border-2 border-gray-600 hover:border-green-400 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 hover:bg-green-400/10"
            >
              Explore Games
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">$50M+</div>
              <div className="text-gray-400">Total Winnings Paid</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">100K+</div>
              <div className="text-gray-400">Active Players</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Choose Your Game
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From classic favorites to innovative new games, we offer the most exciting crypto gambling experience with
              provably fair results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're committed to providing the safest, fairest, and most rewarding crypto gambling experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent =
                feature.icon === "zap"
                  ? Zap
                  : feature.icon === "shield"
                    ? Shield
                    : feature.icon === "coins"
                      ? Coins
                      : feature.icon === "users"
                        ? Users
                        : feature.icon === "award"
                          ? Award
                          : TrendingUp

              return (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-green-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-400/10"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/20 rounded-3xl p-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Start Winning?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of players who trust us with their crypto. Connect your wallet and start playing in
              seconds.
            </p>

            {isConnected ? (
              <button
                onClick={() => scrollToSection("games")}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold py-4 px-12 rounded-2xl text-xl transition-all duration-200 hover:shadow-2xl hover:shadow-green-400/25 hover:-translate-y-1 flex items-center space-x-3 mx-auto"
              >
                <span>Start Playing Now</span>
              </button>
            ) : (
              <button
                onClick={openModal}
                disabled={isConnecting}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold py-4 px-12 rounded-2xl text-xl transition-all duration-200 hover:shadow-2xl hover:shadow-green-400/25 hover:-translate-y-1 flex items-center space-x-3 mx-auto disabled:opacity-50"
              >
                <Wallet className="w-7 h-7" />
                <span>{isConnecting ? "Connecting..." : "Connect Wallet Now"}</span>
              </button>
            )}

            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <span>Instant Payouts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>Provably Fair</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CG</span>
              </div>
              <span className="text-xl font-bold">CryptoGamble</span>
            </div>

            <div className="text-gray-400 text-center md:text-right">
              <p className="mb-2">© 2024 CryptoGamble. All rights reserved.</p>
              <p className="text-sm">Play responsibly. Must be 18+ to participate.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Wallet Modal */}
      <WalletModal isOpen={false} onClose={() => {}} />
      {/* Connect Wallet Modal */}
      <ConnectWalletModal />
    </div>
  )
}
