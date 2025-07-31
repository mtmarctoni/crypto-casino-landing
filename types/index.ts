export interface Game {
  id: string
  name: string
  description: string
  image: string
  category: "classic" | "crash" | "table" | "lottery"
  minBet: string
  maxWin: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface WalletOption {
  name: string
  icon: string
  description: string
}
