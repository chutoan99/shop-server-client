import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import OrderController from './order.controller'
const router = express.Router()

router.post('/', verifyToken, OrderController.Create)
router.get('/search', verifyToken, OrderController.Search)
router.get('/:orderid', verifyToken, OrderController.GetOne)

export default router
