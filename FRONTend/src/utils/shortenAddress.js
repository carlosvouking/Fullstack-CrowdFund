// slicing the address to show nly the 1rst 6 and the last 4 characters.
//export const shortenAddress =(address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`

export const shortenAddress = (address) => `${address?.slice(0, 5)}...${address?.slice(address.length - 4)}`;


// export const shortenAddress = (address) => {
//     if(address.length) {
//       return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
//     }
//     return address
// }