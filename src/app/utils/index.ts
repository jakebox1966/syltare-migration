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

    if (navigator.userAgent.indexOf('MetaMaskMobile') > -1) {
        alert('인앱 입니다.')
        isCheck = true
    }
    return isCheck
}
