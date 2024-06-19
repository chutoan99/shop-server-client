export  interface UpdateCartDto  {
  amount: number
	item_option: string
}


export  interface CreateCartDto  {
	shopid: number
	amount: number
	itemid: number
	tierVariation: string
	item_option: string
}
