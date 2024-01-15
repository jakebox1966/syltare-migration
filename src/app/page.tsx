'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
    MenuItem,
} from '@material-tailwind/react'
import { useMetaMask } from './hooks/useMetamask'
import { Alchemy, Network, Wallet } from 'alchemy-sdk'
import { getNonce, sendAddresses } from './api/api'
import Loading from './components/Loading'
import { useRouter } from 'next/navigation'
import { checkMobile } from './utils'

// Configures the Alchemy SDK
const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your API key
    // network: Network.ETH_SEPOLIA, // Replace with your network
    network: Network.ETH_MAINNET, // Replace with your network
}

const alchemy = new Alchemy(config)

export default function Home() {
    const [open, setOpen] = React.useState(true)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isMobile, setIsMobile] = React.useState(false)

    const [inputs, setInputs] = useState({
        syltareAddress: '',
        konkritAddress: '',
    })
    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()
    const router = useRouter()

    const syltareRef = useRef<HTMLInputElement>(null)
    const konkritRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const result = checkMobile()

        if (result) {
            setIsMobile(true)
            return
        }
        setIsMobile(false)
    }, [])

    const handleOpen = () => setOpen((cur) => !cur)

    const inputHandler = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target

        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const inputValidation = () => {
        if (inputs.syltareAddress === '') {
            alert('Syltare 주소를 입력해주세요.')
            if (syltareRef.current) {
                syltareRef.current.focus()
            }
            return false
        }

        if (inputs.konkritAddress === '') {
            alert('Konkrit 지갑 주소를 입력해주세요.')
            if (konkritRef.current) {
                konkritRef.current.focus()
            }
            return false
        }
        return true
    }

    const submit = async () => {
        try {
            setIsLoading(true)

            if (!inputValidation()) {
                setIsLoading(false)
                return
            }
            // 실타래 관련 NFT소유자인지 확인
            const result = await alchemy.nft.getNftsForOwner(wallet.accounts[0], {
                contractAddresses: [
                    process.env.NEXT_PUBLIC_SYLTARE_DOWN_OF_EAST as string,
                    process.env.NEXT_PUBLIC_SYLTARE_MAPAE_OF_EAST as string,
                ],
                omitMetadata: true,
            })

            if (result.ownedNfts.length <= 0) {
                alert('SYLTARE NFT를 보유한 지갑이 아닙니다.')
                setIsLoading(false)
                return
            }

            const response = await getNonce(wallet.accounts[0])

            const signature = await window.ethereum.request({
                method: 'personal_sign',
                params: [response.eth_nonce, wallet.accounts[0]],
            })

            const finalResponse = await sendAddresses(
                {
                    wallet_signature: signature,
                    konkrit_address: inputs.konkritAddress,
                },
                wallet.accounts[0],
            )

            if (finalResponse.ok) {
                setIsLoading(false)
                // alert('지갑 주소 제출이 완료되었습니다.')
                router.push('/success')
            }
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (wallet.accounts.length > 0) {
            setInputs((prev) => ({
                ...prev,
                syltareAddress: wallet.accounts[0],
            }))
            setOpen(false)
        } else {
            setOpen(true)
            setInputs((prev) => ({
                ...prev,
                syltareAddress: '',
            }))
        }
    }, [wallet])

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-start">
                <div className="p-6">
                    <code className="font-mono text-2xl font-bold">SYLTARE TO KONKRIT</code>
                </div>

                <div className="flex flex-col justify-start items-center w-full gap-10 max-w-[500px]">
                    <div className="p-6 w-full syltare flex flex-row justify-center items-center shadow-2xl">
                        <div className="border-4 border-gray-300/80 p-7 rounded-lg backdrop-blur-sm">
                            <h2 className={`mb-3 text-2xl font-semibold text-gray-200`}>
                                SYLTARE WALLET ADDRESS{' '}
                            </h2>

                            <div className="rounded-full text-black overflow-hidden mt-10 shadow-3xl">
                                <input
                                    ref={syltareRef}
                                    className="w-full bg-gray-300/80 h-full p-3 focus:outline-none text-gray-800"
                                    type="text"
                                    name="syltareAddress"
                                    value={inputs.syltareAddress}
                                    onChange={inputHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 w-full rounded-xl konkrit flex flex-row justify-center items-center shadow-2xl">
                        <div className="border-4 p-7 rounded-lg backdrop-blur-sm">
                            <h2 className={`mb-3 text-2xl z-1 font-semibold text-gray-200`}>
                                KONKRIT WALLET ADDRESS
                            </h2>

                            <div className="rounded-full text-black overflow-hidden mt-10 shadow-2xl">
                                <input
                                    ref={konkritRef}
                                    className="w-full bg-gray-300/80 h-full p-3 focus:outline-none text-gray-800"
                                    type="text"
                                    name="konkritAddress"
                                    onChange={inputHandler}
                                    value={inputs.konkritAddress}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-gray-300/90 p-3 transition-all rounded-full shadow-inner cursor-pointer w-[50%] text-center hover:opacity-90 shadow-white"
                        onClick={submit}>
                        <h2 className={`text-normal font-semibold text-white`}>SUBMIT</h2>
                    </div>
                </div>
            </main>

            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                placeholder={undefined}
                dismiss={{
                    enabled: true,
                    escapeKey: false,
                    // referencePress: false,
                    outsidePress: false,
                }}>
                <DialogHeader className="justify-between" placeholder={undefined}>
                    <div>
                        <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                            Connect a Wallet
                        </Typography>
                        <Typography color="gray" variant="paragraph" placeholder={undefined}>
                            Connect your wallet to the App.
                        </Typography>
                    </div>
                </DialogHeader>
                <DialogBody className="overflow-y-scroll !px-5" placeholder={undefined}>
                    <div className="mb-6">
                        <ul className="mt-3 -ml-2 flex flex-col gap-1">
                            {!isMobile && wallet.accounts.length < 1 && (
                                <MenuItem
                                    className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md"
                                    placeholder={undefined}
                                    onClick={connectMetaMask}>
                                    <img
                                        src="https://docs.material-tailwind.com/icons/metamask.svg"
                                        alt="metamast"
                                        className="h-6 w-6"
                                    />
                                    <Typography
                                        className="uppercase"
                                        color="blue-gray"
                                        variant="h6"
                                        placeholder={undefined}>
                                        Connect with MetaMask
                                    </Typography>
                                </MenuItem>
                            )}

                            {!isMobile && !hasProvider && (
                                <MenuItem
                                    className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md"
                                    placeholder={undefined}>
                                    <img
                                        src="https://docs.material-tailwind.com/icons/metamask.svg"
                                        alt="metamast"
                                        className="h-6 w-6"
                                    />
                                    <Typography
                                        className="uppercase"
                                        color="blue-gray"
                                        variant="h6"
                                        placeholder={undefined}>
                                        <a href="https://metamask.io" target="_blank">
                                            Install MetaMask
                                        </a>
                                    </Typography>
                                </MenuItem>
                            )}

                            {isMobile && (
                                <MenuItem
                                    className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md"
                                    placeholder={undefined}>
                                    <img
                                        src="https://docs.material-tailwind.com/icons/metamask.svg"
                                        alt="metamast"
                                        className="h-6 w-6"
                                    />
                                    <Typography
                                        className="uppercase"
                                        color="blue-gray"
                                        variant="h6"
                                        placeholder={undefined}>
                                        <a href={process.env.NEXT_PUBLIC_DEEP_LINK}>
                                            Connect with MetaMask(M)
                                        </a>
                                    </Typography>
                                </MenuItem>
                            )}
                        </ul>
                    </div>
                </DialogBody>
            </Dialog>

            {isLoading && <Loading />}
        </>
    )
}
