"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Copy, ExternalLink, LogOut, User, Wallet } from "lucide-react"
import { useWalletConnection } from "@/hooks/use-wallet-connection"

export default function WalletButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { address, balance, ensName, formatAddress, formatBalance, handleDisconnect } = useWalletConnection()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      // You could add a toast notification here
    }
  }

  const openEtherscan = () => {
    if (address) {
      window.open(`https://etherscan.io/address/${address}`, "_blank")
    }
  }

  if (!address) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-green-400/50 rounded-xl px-4 py-2 transition-all duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
          <Wallet className="w-4 h-4 text-white" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-white font-medium text-sm">{ensName || formatAddress(address)}</div>
          <div className="text-gray-400 text-xs">{formatBalance(balance)} ETH</div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-xl shadow-2xl z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">{ensName || "Wallet Connected"}</div>
                <div className="text-gray-400 text-sm">{formatAddress(address)}</div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-gray-400 text-xs mb-1">Balance</div>
              <div className="text-white font-bold text-lg">{formatBalance(balance)} ETH</div>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={copyAddress}
              className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Address</span>
            </button>
            <button
              onClick={openEtherscan}
              className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Etherscan</span>
            </button>
            <button
              onClick={() => {
                /* Open user profile */
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <hr className="border-gray-800 my-2" />
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
