import BaseModel from '~/systems/other/baseMode.system'

export interface CommentModel extends BaseModel {
	id: number
	parent_cmtid: number | null
	userid: number
	shopid: number
	orderid: number
	itemid: number
	level: number
	is_shop: boolean
	rating: number | null | undefined
	comment: string
	rating_star: number
	status: number
	author_username: string
	author_portrait?: string | null
	images: string | null | undefined
	cover?: string | null | undefined
	videos?: string | null | undefined
	tierVariation?: string | null | undefined
	list_option?: string | null | undefined
	is_replied: boolean
	like_count: number | null | undefined
	liked: boolean | null | undefined
}
