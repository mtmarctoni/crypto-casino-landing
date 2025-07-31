"use client"

import { useConnect, useAccount, useDisconnect, useBalance, useEnsName } from "wagmi"
import { useState } from "react"

export function useWalletConnection() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [connectingConnector, setConnectingConnector] = useState<string | null>(null)

  const { data: balance } = useBalance({
    address: address,
  })

  const { data: ensName } = useEnsName({
    address: address,
  })

  const handleConnect = async (connector: any) => {
    try {
      setConnectingConnector(connector.name)
      await connect({ connector })
      setIsModalOpen(false)
      setConnectingConnector(null)
    } catch (error) {
      console.error("Connection failed:", error)
      setConnectingConnector(null)
    }
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setConnectingConnector(null)
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (bal: any) => {
    if (!bal) return "0.000"
    return Number.parseFloat(bal.formatted).toFixed(3)
  }

  return {
    // Connection state
    address,
    isConnected,
    isConnecting: isConnecting || isReconnecting || isPending,
    connectingConnector,

    // Data
    balance,
    ensName,
    connectors,
    error,

    // Modal state
    isModalOpen,

    // Actions
    handleConnect,
    handleDisconnect,
    openModal,
    closeModal,

    // Utilities
    formatAddress,
    formatBalance,
  }
}
