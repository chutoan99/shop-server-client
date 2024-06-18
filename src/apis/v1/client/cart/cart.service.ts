import { generateCartId } from '~/helpers/generateId'
import MESSAGE from '~/@core/contains/message.json'
import Cart from './cart.entity'
import CartRepository from './cart.repository'
import { Builder } from 'builder-pattern'
import { LoggerSystem } from '~/systems/logger'
import _ from 'lodash'
import { WriteResponse } from '~/systems/other/response.system'

export default class CartService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _cartRepository: CartRepository
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._cartRepository = new CartRepository()
	}

	public FindAll = async (userid: number): Promise<{}> => {
		try {
			const result: Cart[] | [] = await this._cartRepository.findAll(
				userid
			)

			let shopIdArrays = result.reduce((acc: any, curr: any) => {
				const shopId = curr.shopid
				if (acc[shopId]) {
					acc[shopId].push(curr)
				} else {
					acc[shopId] = [curr]
				}
				return acc
			}, {})

			const listNumberCart: any[] = []
			shopIdArrays = Object.values(shopIdArrays)
			shopIdArrays.map((ele: any) =>
				ele.map((item: any, index: number) =>
					listNumberCart.push(index)
				)
			)

			let total = 0
			if (_.isArray(listNumberCart)) {
				total = listNumberCart.length
			}

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				total: total,
				response: shopIdArrays
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public Create = async (
		payload: Cart,
		userid: number
	): Promise<WriteResponse> => {
		try {
			const cart: Cart = await this._cartRepository.find(payload, userid)

			if (cart) {
				const idUpdated: boolean =
					await this._cartRepository.updateAmount(
						cart,
						userid,
						cart.amount + 1
					)

				if (idUpdated) {
					return {
						err: 0,
						msg: MESSAGE.UPDATE.SUCCESS
					}
				} else {
					return {
						err: 1,
						msg: MESSAGE.UPDATE.FAIL
					}
				}
			}

			const newCart = Builder<Cart>()
				.id(generateCartId())
				.userid(userid)
				.itemid(payload?.itemid)
				.shopid(payload?.shopid)
				.item_option(payload?.item_option)
				.tierVariation(payload?.tierVariation)
				.amount(payload?.amount)
				.build()

			const isCreated: boolean = await this._cartRepository.create(
				newCart
			)
			if (isCreated) {
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

	public Update = async (
		cartid: number,
		payload: Cart
	): Promise<WriteResponse> => {
		try {
			const isUpdated: boolean = await this._cartRepository.update(
				cartid,
				payload
			)

			if (isUpdated) {
				return {
					err: 0,
					msg: MESSAGE.UPDATE.SUCCESS
				}
			} else {
				return {
					err: 1,
					msg: MESSAGE.UPDATE.FAIL
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public Delete = async (cartid: number): Promise<WriteResponse> => {
		try {
			const isDeleted: Boolean = await this._cartRepository.delete(cartid)

			if (isDeleted) {
				return {
					err: 0,
					msg: MESSAGE.DELETE.SUCCESS
				}
			} else {
				return {
					err: 1,
					msg: MESSAGE.DELETE.FAIL
				}
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
