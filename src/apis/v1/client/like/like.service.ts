import MESSAGE from '~/@core/contains/message.json'
import { generateLikeId } from '~/helpers/generateId'
import LikeRepository from './like.repository'
import Like from './like.entity'
import { Builder } from 'builder-pattern'
import _ from 'lodash'
import LikeResponse from './like.response'
import { LoggerSystem } from '~/systems/logger'
import { WriteResponse } from '~/systems/other/response.system'
export default class LikeService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _likeRepository: LikeRepository
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._likeRepository = new LikeRepository()
	}

	public FindAll = async (userid: number): Promise<LikeResponse> => {
		try {
			let total = 0
			const response: Like[] = await this._likeRepository.findAll(userid)

			if (_.isArray(response)) {
				total = response.length
			}
			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				total: total,
				response: response
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public Create = async (
		payload: Like,
		userid: number
	): Promise<WriteResponse> => {
		try {
			const checkResult = await this.checkExistLike(payload.itemid)
			if (checkResult) {
				return checkResult
			}
			const newLike: Like = Builder<Like>()
				.id(generateLikeId())
				.userid(userid)
				.itemid(payload.itemid)
				.shopid(payload.shopid)
				.build()

			const isCreated: boolean = await this._likeRepository.create(
				newLike
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

	public Delete = async (id: number): Promise<WriteResponse> => {
		try {
			const isDeleted: boolean = await this._likeRepository.delete(id)
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

	public checkExistLike = async (id: number) => {
		const existingRoom: Like = await this._likeRepository.find(id)
		if (existingRoom) {
			return {
				err: 1,
				msg: 'Likes Already Exists'
			}
		}
	}
}
