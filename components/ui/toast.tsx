"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error" | "warning"
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-400" />,
  }

  const colors = {
    success: "border-green-400/50 bg-green-500/10",
    error: "border-red-400/50 bg-red-500/10",
    warning: "border-yellow-400/50 bg-yellow-500/10",
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-300">
      <div className={`flex items-center space-x-3 p-4 rounded-xl border backdrop-blur-xl ${colors[type]} max-w-sm`}>
        {icons[type]}
        <span className="text-white font-medium flex-1">{message}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error" | "warning"
    isVisible: boolean
  }>({
    message: "",
    type: "success",
    isVisible: false,
  })

  const showToast = (message: string, type: "success" | "error" | "warning" = "success") => {
    setToast({ message, type, isVisible: true })
  }

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }

  return {
    toast,
    showToast,
    hideToast,
  }
}
