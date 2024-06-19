
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