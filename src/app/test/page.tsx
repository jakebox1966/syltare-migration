'use client'

import { Alchemy, Network } from 'alchemy-sdk'
import * as React from 'react'

export interface ItestProps {}

// Configures the Alchemy SDK
const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your API key
    // network: Network.ETH_SEPOLIA, // Replace with your network
    network: Network.ETH_MAINNET, // Replace with your network
}

const alchemy = new Alchemy(config)

export default function test(props: ItestProps) {
    const test = () => {}
    return (
        <>
            {/* <div className='bg-[url("/main_logo_text.svg")] bg-contain bg-no-repeat bg-center h-[50vh] opacity-50'></div> */}

            <button className="border-1 text-white p-2">TEST</button>
        </>
    )
}
