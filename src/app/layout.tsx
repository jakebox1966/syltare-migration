import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MetaMaskContextProvider } from './hooks/useMetamask'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Wallet Migration',
    description: 'Generated by LikeLion',
    // icons: {
    //     icon: '/icon.png',
    // },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MetaMaskContextProvider>{children}</MetaMaskContextProvider>
            </body>
        </html>
    )
}
