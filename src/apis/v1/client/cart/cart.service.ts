import { generateCartId } from '~/helpers/generateId'
import MESSAGE from '~/@core/contains/message.json'
import CartRepository from './cart.repository'
import { Builder } from 'builder-pattern'
import _ from 'lodash'
import { BaseResponse } from '~/systems/other/response.system'
import { CartModel } from './cart.model'
import { CreateCartDto, UpdateCartDto } from './cart.dto'
import { LoggerSystem } from '~/systems/logger'
export default class CartService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _cartRepository: CartRepository

	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._cartRepository = new CartRepository()
	}

	public FindAll = async (userid: number): Promise<{}> => {
		try {
			const result: CartModel[] | [] = await this._cartRepository.findAll(
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
		payload: CreateCartDto,
		userid: number
	): Promise<BaseResponse> => {
		try {
			const cart: CartModel = await this._cartRepository.find(
				payload as CartModel,
				userid
			)

			if (cart) {
				const idUpdated: boolean =
					await this._cartRepository.updateAmount(
						cart,
						userid,
						cart.amount + 1
					)

				if (!idUpdated) {
					return {
						err: 1,
						msg: MESSAGE.UPDATE.FAIL
					}
				}

				return {
					err: 0,
					msg: MESSAGE.UPDATE.SUCCESS
				}
			}

			const newCart = Builder<CartModel>()
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
			if (!isCreated) {
				return {
					err: 1,
					msg: MESSAGE.CREATE.FAIL
				}
			}

			return {
				err: 0,
				msg: MESSAGE.CREATE.SUCCESS
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public Update = async (
		cartid: number,
		payload: UpdateCartDto
	): Promise<BaseResponse> => {
		try {
			const newCart: CartModel = Builder<CartModel>()
				.item_option(payload.item_option)
				.amount(payload.amount)
				.build()

			const isUpdated: boolean = await this._cartRepository.update(
				cartid,
				newCart
			)

			if (!isUpdated) {
				return {
					err: 1,
					msg: MESSAGE.UPDATE.FAIL
				}
			}
			return {
				err: 0,
				msg: MESSAGE.UPDATE.SUCCESS
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public Delete = async (cartid: number): Promise<BaseResponse> => {
		try {
			const isDeleted: Boolean = await this._cartRepository.delete(cartid)

			if (!isDeleted) {
				return {
					err: 1,
					msg: MESSAGE.DELETE.FAIL
				}
			}
			return {
				err: 0,
				msg: MESSAGE.DELETE.SUCCESS
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}
}
