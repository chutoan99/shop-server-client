import MESSAGE from '~/@core/contains/message.json'
import { generateOrderId } from '~/helpers/generateId'
import OrderRepository from './order.repository'
import OrderQueries from './order.queries'
import Order, { stateOrder, titleStateOrder } from './order.entity'
import { Builder } from 'builder-pattern'
import { LoggerSystem } from '~/systems/logger'
import { WriteResponse } from '~/systems/other/response.system'
export default class OrderService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _orderRepository: OrderRepository
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._orderRepository = new OrderRepository()
	}

	public Search = async (userid: number, queries: OrderQueries) => {
		try {
			const tab: any[] = await this._orderRepository.getTab(userid)
			const response: Order[] = await this._orderRepository.search(
				userid,
				queries
			)

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				response: response,
				tab: tab[0].tab
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public Find = async (orderid: number) => {
		try {
			const response: Order = await this._orderRepository.find(orderid)
			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				response: response
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public create = async (
		payload: Order[],
		userid: number
	): Promise<WriteResponse> => {
		try {
			const creationResults: boolean[] = []
			for (const item of payload) {
				const order = Builder<Order>()
					.id(generateOrderId())
					.userid(userid)
					.shopid(item.shopid)
					.shop_name(item.shop_name)
					.amount(item.amount)
					.item_option(item.item_option)
					.note(item.note)
					.state(titleStateOrder.is_wait_for_confirm)
					.type(stateOrder.is_wait_for_confirm)
					.shiped(false)
					.item_groups_id(item.item_groups_id)
					.final_total(item.final_total)
					.total_num_items(item.total_num_items)
					.tierVariation(item.tierVariation)
					.build()

				const isCreated = await this._orderRepository.create(order)
				creationResults.push(isCreated)
			}

			if (creationResults.every((result) => result)) {
				return {
					err: 0,
					msg: MESSAGE.CREATE.SUCCESS
				}
			} else {
				return {
					err: 1,
					msg: MESSAGE.CREATE.FAIL
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
