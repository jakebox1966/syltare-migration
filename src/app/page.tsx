'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
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

export default function Home() {
    const [open, setOpen] = React.useState(true)

    const handleOpen = () => setOpen((cur) => !cur)

    const [inputs, setInputs] = useState({
        syltareAddress: '',
        konkritAddress: '',
    })

    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()

    const inputHandler = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target

        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // useEffect(() => {
    //     console.log(open)
    // }, [open])
    // useEffect(() => {
    //     console.log(window.ethereum?.isMetaMask)
    //     console.log(wallet.accounts.length)
    // }, [])

    useEffect(() => {
        console.log('월렛값변경')
        console.log(wallet)

        if (wallet.accounts.length > 0) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }, [wallet])

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-start">
                <div className="p-6">
                    <code className="font-mono  text-2xl font-bold">SYLTARE TO KONKRIT</code>
                </div>

                <div className="flex flex-col justify-start items-center w-full gap-10 max-w-[500px]">
                    <div className="p-6 w-full syltare flex flex-row justify-center items-center shadow-2xl">
                        <div className="border-4 border-gray-300/80 p-7 rounded-lg">
                            <h2 className={`mb-3 text-2xl font-semibold text-gray-200`}>
                                SYLTARE WALLET ADDRESS{' '}
                            </h2>

                            <div className="rounded-full text-black overflow-hidden mt-10 shadow-2xl">
                                <input
                                    className="w-full bg-gray-300/80 h-full p-3 focus:outline-none text-gray-800"
                                    type="text"
                                    name="syltareAddress"
                                    onChange={inputHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 w-full rounded-xl konkrit flex flex-row justify-center items-center shadow-2xl">
                        <div className="border-4 p-7 rounded-lg">
                            <h2 className={`mb-3 text-2xl z-1 font-semibold text-gray-200`}>
                                KONKRIT WALLET ADDRESS
                            </h2>

                            <div className="rounded-full text-black overflow-hidden mt-10 shadow-2xl">
                                <input
                                    className="w-full bg-gray-300/80 h-full p-3 focus:outline-none text-gray-800"
                                    type="text"
                                    name="konkritAddress"
                                    onChange={inputHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-300/90 p-3 transition-all rounded-full shadow-inner cursor-pointer w-[50%] text-center hover:opacity-90 shadow-white">
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
                        <Typography
                            variant="h5"
                            color="blue-gray"
                            placeholder={undefined}
                            onClick={handleOpen}>
                            Connect a Wallet
                        </Typography>
                        <Typography color="gray" variant="paragraph" placeholder={undefined}>
                            Choose which card you want to connect
                        </Typography>
                    </div>
                </DialogHeader>
                <DialogBody className="overflow-y-scroll !px-5" placeholder={undefined}>
                    <div className="mb-6">
                        <ul className="mt-3 -ml-2 flex flex-col gap-1">
                            {wallet.accounts.length < 1 && (
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

                            {!hasProvider && (
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
                        </ul>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    )
}
