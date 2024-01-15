export const getNonce = async (account: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${account}`)

    const result = await response.json()

    return result
}

export const sendAddresses = async (
    addresses: { wallet_signature: string; konkrit_address: string },
    account: string,
) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${account}`, {
        method: 'PATCH',
        body: JSON.stringify(addresses),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response
}
