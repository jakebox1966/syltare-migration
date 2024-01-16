export const formatBalance = (rawBalance: string) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
    const chainIdNum = parseInt(chainIdHex)
    return chainIdNum
}

export const formatAddress = (addr: string) => {
    return `${addr.substring(0, 8)}...`
}

export const checkMobile = () => {
    const user = navigator.userAgent

    let isCheck = false

    if (user.indexOf('iPhone') > -1 || user.indexOf('Android') > -1) {
        isCheck = true
    }

    return isCheck
}

export const checkIsInApp = () => {
    const user = navigator.userAgent

    let isCheck = false
    alert(`metamask ====> ${navigator.userAgent.indexOf('MetaMaskMobile')}`)
    alert(`metamask ====> ${navigator.userAgent.indexOf('Metamask')}`)
    alert(`metamask ====> ${navigator.userAgent.indexOf('METAMASK')}`)

    if (
        navigator.userAgent.indexOf('metamask') > -1 ||
        navigator.userAgent.indexOf('Metamask') > -1 ||
        navigator.userAgent.indexOf('METAMASK') > -1
    ) {
        console.log(navigator.userAgent.indexOf('Metamask'))
        console.log(navigator.userAgent.indexOf('metamask') > -1)
        console.log(navigator.userAgent.indexOf('METAMASK') > -1)
        console.log(navigator.userAgent.indexOf('Metamask') > -1)
        // alert(navigator.userAgent)
        // alert(navigator.userAgent.includes(''))
        isCheck = true
    }
    return isCheck
}
