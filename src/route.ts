import { Express } from 'express'
import expressWinston from 'express-winston'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '~/configs/swagger.json'
import WriteLogger from './configs/winston'
import { transports, format, Logform } from 'winston'
const { printf } = format
//? CRAWL
import CrawlRoute from './apis/v1/crawl'
//? INSERT
import InsertRoute from './apis/v1/insert'

import ShopRoute from './apis/v1/client/shop'
import RoomRoute from './apis/v1/client/room'
import UserRoute from './apis/v1/client/user'
import AuthRoute from './apis/v1/client/auth'
import LikeRoute from './apis/v1/client/like'
import PostRoute from './apis/v1/client/post'
import CartRoute from './apis/v1/client/cart'
import OrderRoute from './apis/v1/client/order'
import NotifyRoute from './apis/v1/client/notify'
import BannerRoute from './apis/v1/client/banner'
import CommentRoute from './apis/v1/client/comment'
import IndustryRoute from './apis/v1/client/industry'
import ShopMallRoute from './apis/v1/client/shopMall'
import BatchListRoute from './apis/v1/client/batchList'
import FlashSaleRoute from './apis/v1/client/flashSale'
import TopProductRoute from './apis/v1/client/topProduct'
import CategoryTreeRoute from './apis/v1/client/categoryTree'
import SearchSuggestRoute from './apis/v1/client/searchSuggest'
import SearchHistoryRoute from './apis/v1/client/searchHistory'

const serveSwagger = swaggerUi.serveFiles(swaggerDocument)

const initRoutes = (app: Express): Express => {
	//? CLIENT
	app.use(
		expressWinston.logger({
			winstonInstance: WriteLogger,
			statusLevels: true
		})
	)
	app.use(
		expressWinston.errorLogger({
			transports: [
				new transports.File({
					level: 'error',
					filename: './log/error/logsInternalErrors.log'
				})
			],
			format: format.combine(
				format.json(),
				format.timestamp(),
				printf((log: Logform.TransformableInfo) => {
					if (log.stack)
						return `[${log.timestamp}] [${log.level}] ${log.stack}`
					return `[${log.timestamp}] [${log.level}] ${log.message}`
				})
			)
		})
	)

	app.use('/api/v1/client/shop', ShopRoute) //* OK
	app.use('/api/v1/client/like', LikeRoute) //* OK
	app.use('/api/v1/client/room', RoomRoute) //* OK
	app.use('/api/v1/client/user', UserRoute) //* OK
	app.use('/api/v1/client/auth', AuthRoute) //* OK
	app.use('/api/v1/client/post', PostRoute) //* OK
	app.use('/api/v1/client/cart', CartRoute) //* OK
	app.use('/api/v1/client/order', OrderRoute) //* OK
	app.use('/api/v1/client/banner', BannerRoute) //* OK
	app.use('/api/v1/client/notify', NotifyRoute) //* OK
	app.use('/api/v1/client/comment', CommentRoute)
	app.use('/api/v1/client/shopMall', ShopMallRoute) //* OK
	app.use('/api/v1/client/industry', IndustryRoute) //* OK
	app.use('/api/v1/client/batchList', BatchListRoute) //* OK
	app.use('/api/v1/client/flashSale', FlashSaleRoute) //* OK
	app.use('/api/v1/client/topProduct', TopProductRoute) //* OK
	app.use('/api/v1/client/searchSuggest', SearchSuggestRoute) //* OK
	app.use('/api/v1/client/searchHistory', SearchHistoryRoute) //* OK
	app.use('/api/v1/client/categoryTree', CategoryTreeRoute) //* OK
	//? CRAWL
	app.use('/api/v1/crawl', CrawlRoute)
	//? INSERT
	app.use('/api/v1/insert', InsertRoute)
	//? DOCS
	app.use(
		'/api/v1/client/docs',
		serveSwagger,
		swaggerUi.setup(swaggerDocument)
	)

	// * If the route does not match any of the above, fall back to this route
	return app.use('/', (req, res) => {
		res.send('server on...')
	})
}

export default initRoutes
