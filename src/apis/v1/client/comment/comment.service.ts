import { generateCmtId } from '~/helpers/generateId'
import MESSAGE from '~/@core/contains/message.json'
import CommentQuery from './comment.query'
import CommentRepository from './comment.repository'
import UserRepository from '../user/user.repository'
import PaginationSystem from '~/systems/pagination/pagination.system'
import { Builder } from 'builder-pattern'
import CommentResponse from './comment.response'
import { BaseResponse } from '~/systems/other/response.system'
import { UserModel } from '../user/user.model'
import { CommentModel } from './comment.model'
import { CreateCommentDto } from './comment.dto'
import { LoggerSystem } from '~/systems/logger'
export default class CommentService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _userRepository: UserRepository
	private readonly _commentRepository: CommentRepository
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._userRepository = new UserRepository()
		this._commentRepository = new CommentRepository()
	}

	public GetAll = async (queries: CommentQuery): Promise<CommentResponse> => {
		try {
			const pagination = new PaginationSystem(queries.limit, queries.page)

			const response: CommentModel[] =
				await this._commentRepository.findAll(pagination)

			pagination.setTotal(response)

			return {
				err: 0,
				msg: MESSAGE.GET.SUCCESS,
				offset: pagination.offset,
				limit: pagination.limit,
				total: pagination.total,
				totalPage: Math.ceil(pagination.total / pagination.limit),
				currentPage: pagination.currentPage,
				response: response
			}
		} catch (error: any) {
			this._loggerSystem.error(error)
			throw error
		}
	}

	public Create = async (
		userid: number,
		payload: CreateCommentDto
	): Promise<BaseResponse> => {
		try {
			const user: UserModel = await this._userRepository.current(userid)
			if (!user) {
				return {
					err: 2,
					msg: MESSAGE.USER.NOT_FOUND
				}
			}

			const comment: CommentModel = Builder<CommentModel>()
				.id(generateCmtId())
				.orderid(payload?.orderid)
				.itemid(payload?.itemid)
				.userid(userid)
				.shopid(payload?.shopid)
				.comment(payload?.comment)
				.rating_star(payload?.rating_star)
				.author_username(user?.name)
				.author_portrait(user?.avatar)
				.images(payload?.images)
				.tierVariation(payload?.tierVariation)
				.list_option(payload?.list_option)
				.level(0)
				.is_shop(false)
				.like_count(0)
				.liked(false)
				.build()

			const isCreated: boolean = await this._commentRepository.create(
				comment
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
}
