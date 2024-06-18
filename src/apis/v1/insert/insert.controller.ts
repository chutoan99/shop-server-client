import InsertService from './insert.service'

class InsertControllers {
	private readonly _insertService: InsertService
	constructor() {
		this._insertService = new InsertService()
	}

	public Industries = (req: any, res: any) => {
		this._insertService.FormatIndustrie()
		return { status: 200, message: 'Industries processed successfully.' }
	}

	public App = (req: any, res: any) => {
		this._insertService.FormatHomeCategory()
		this._insertService.FormatSearchSuggestion()
		this._insertService.FormatInsertNotify()
		this._insertService.FormatBanner()
		this._insertService.FormatShopMall()
		this._insertService.FormatBatchList()
		this._insertService.FormatTopProduct()
		this._insertService.FormatFlashSale()
		return { status: 200, message: 'app processed successfully.' }
	}

	//?  from 1 - 714
	public ShopAndUser = (req: any, res: any) => {
		const { start, end } = req.params
		this._insertService.FormatShopAndUser(+start, +end)
		return {
			status: 200,
			message: 'Shops and Users processed successfully.'
		}
	}

	//?  from 0 - 1939
	public Comment = (req: any, res: any) => {
		const { start, end } = req.params
		this._insertService.FormatComment(+start, +end)
		return { status: 200, message: 'comment processed successfully.' }
	}

	//?  from 0 - 1314
	public Post = (req: any, res: any) => {
		const { start, end } = req.params
		this._insertService.FormatPost(+start, +end)
		return { status: 200, message: 'post processed successfully.' }
	}
}

export default new InsertControllers()
