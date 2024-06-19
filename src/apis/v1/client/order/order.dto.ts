
export interface CreateOrderDto  {
	shopid: number
  note: string
  item_groups_id: string
  shop_name: string
  amount: string
	item_option: string
  final_total: number
	total_num_items: number
  tierVariation: string
}
