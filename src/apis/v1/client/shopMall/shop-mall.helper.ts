import ShopMall from './shop-mall.entity'

export const formatShopMall = (shopMallList: ShopMall[]): ShopMall[][] => {
	const ShopMallArray: any[][] = []
	const lastIdx = shopMallList.length - 1

	for (let i = 0; i < lastIdx; i += 2) {
		const obj1 = {
			id: shopMallList[i]?.id,
			image: shopMallList[i]?.image,
			url: shopMallList[i]?.url,
			promo_text: shopMallList[i]?.promo_text,
			createdAt: shopMallList[i]?.createdAt,
			updatedAt: shopMallList[i]?.updatedAt
		}
		const obj2 = {
			id: shopMallList[i + 1]?.id,
			image: shopMallList[i + 1]?.image,
			url: shopMallList[i + 1]?.url,
			promo_text: shopMallList[i + 1]?.promo_text,
			createdAt: shopMallList[i + 1]?.createdAt,
			updatedAt: shopMallList[i + 1]?.updatedAt
		}

		if (!isEmptyObject(obj1) || !isEmptyObject(obj2)) {
			ShopMallArray.push([obj1, obj2])
		}
	}

	// If the last object is not empty, add it as a single item to the result array
	if (!isEmptyObject(shopMallList[lastIdx])) {
		ShopMallArray.push([shopMallList[lastIdx]])
	}

	return ShopMallArray
}

const isEmptyObject = (obj: any) => {
	return Object.keys(obj).length === 0
}
