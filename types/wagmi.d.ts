// types/wagmi.d.ts
import type { wagmiConfig } from '@/lib/wagmi-config'

declare module 'wagmi' {
    interface Register {
        config: typeof wagmiConfig
    }
}
