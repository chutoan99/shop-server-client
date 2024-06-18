export const generateItemId = (): number => {
	return +Math.floor(Math.random() * 10000000000)
}

export const generateShopId = (): number => {
	return +Math.floor(Math.random() * 1000000000)
}

export const generateUserId = (): number => {
	return +Math.floor(Math.random() * 100000000)
}

export const generateCatId = (): number => {
	return +Math.floor(Math.random() * 1000000)
}

export const generateCmtId = (): number => {
	return +Math.floor(Math.random() * 10000000000)
}

export const generateCartId = (): number => {
	return +Math.floor(Math.random() * 10000000000000)
}

export const generateOrderId = (): number => {
	return +Math.floor(Math.random() * 1000000000000000)
}

export const generateChatId = (): number => {
	return +Math.floor(Math.random() * 100000000000000000)
}

export const generateRoomId = (userid: number, shopid: number): number => {
	return userid + shopid
}

export const generateLikeId = (): number => {
	return +Math.floor(Math.random() * 10000000)
}
