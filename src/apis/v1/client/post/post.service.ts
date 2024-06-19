import MESSAGE from '~/@core/contains/message.json'
import PostRepository from './post.repository'
import PostQueries from './post.query'
import PaginationSystem from '~/systems/pagination/pagination.system'
import { PostIdResponse, PostResponse } from './post.response'
import { LoggerSystem } from '~/systems/logger'
import { PostModel } from './post.model'

export default class PostService {
	private readonly _loggerSystem: LoggerSystem
	private readonly _postRepository: PostRepository
	constructor() {
		this._loggerSystem = new LoggerSystem()
		this._postRepository = new PostRepository()
	}

	public Search = async (queries: PostQueries): Promise<PostResponse> => {
		try {
			const pagination = new PaginationSystem(queries.limit, queries.page)
			const response: PostModel[] = await this._postRepository.search(
				pagination,
				queries
			)
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

	public Find = async (itemid: number): Promise<PostIdResponse> => {
		try {
			const response: PostModel = await this._postRepository.find(itemid)

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
}
