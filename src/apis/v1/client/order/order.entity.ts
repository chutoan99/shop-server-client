import BaseModel from '~/systems/other/baseMode.system'

export enum stateOrder {
	is_all,
	is_wait_for_confirm,
	is_wait_for_pay,
	is_transport,
	is_delivering,
	is_cancelled,
	is_success,
	is_returns
}

export enum titleStateOrder {
	is_all = 'Tất cả',
	is_wait_for_confirm = 'Chờ xác nhận',
	is_wait_for_pay = 'Chờ thanh toán',
	is_transport = 'Vận chuyển',
	is_delivering = 'Đang giao',
	is_cancelled = 'Đã hủy',
	is_success = 'Hoàn thành',
	is_returns = 'Trả hàng'
}

export default interface Order extends BaseModel {
	id: number
	shopid: number
	userid: number
	item_groups_id: string
	amount: string
	item_option: string
	final_total: number
	total_num_items: number
	shop_name: string
	note: string
	state: string
	type: number
	shiped: boolean
	tierVariation: string
}
