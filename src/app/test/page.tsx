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
    const submit1 = async () => {
        try {
            const result = await alchemy.nft.getNftsForOwner(
                process.env.NEXT_PUBLIC_TEST_ADDRESS as string,
                {
                    contractAddresses: [
                        process.env.NEXT_PUBLIC_SYLTARE_DOWN_OF_EAST as string,
                        process.env.NEXT_PUBLIC_SYLTARE_MAPAE_OF_EAST as string,
                    ],
                    omitMetadata: true,
                },
            )

            console.log('REsult', result)

            if (result.ownedNfts.length === 0) {
                alert('SYLTARE NFT를 보유한 지갑이 아닙니다.')

                return
            }

            // const response = await getNonce(wallet.accounts[0])

            // const signature = await window.ethereum.request({
            //     method: 'personal_sign',
            //     params: [response.eth_nonce, wallet.accounts[0]],
            // })

            // const finalResponse = await sendAddresses(
            //     {
            //         wallet_signature: signature,
            //         konkrit_address: inputs.konkritAddress,
            //     },
            //     wallet.accounts[0],
            // )

            // if (finalResponse.ok) {
            //     setIsLoading(false)
            //     // alert('지갑 주소 제출이 완료되었습니다.')
            //     router.push('/success')
            // }
        } catch (error) {
            console.error(error)
        }
    }

    const test = () => {}
    return (
        <>
            {/* <div className='bg-[url("/main_logo_text.svg")] bg-contain bg-no-repeat bg-center h-[50vh] opacity-50'></div> */}

            <button className="border-1 text-white p-2" onClick={submit1}>
                TEST
            </button>
        </>
    )
}
