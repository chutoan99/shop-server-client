import { Request, Response } from 'express'
import PostService from './post.service'
import { internalServerError } from '~/@core/systems/handle_errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'
import PostQuery from './post.query'
class PostController {
	private readonly _postService: PostService
	constructor() {
		this._postService = new PostService()
	}

	public Search = async (
		req: Request,
		res: Response
	): Promise<Response<any, Record<string, any>>> => {
		try {
			const queries = new PostQuery(req)
			const response = await this._postService.Search(queries)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			return internalServerError(res)
		}
	}

	public Find = async (req: Request, res: Response) => {
		try {
			const response = await this._postService.Find(+req.params.itemid)
			return res.status(STATUS_CODE.SUCCESSFUL.OK).json(response)
		} catch (error) {
			internalServerError(res)
		}
	}
}

export default new PostController()
