import express from 'express'
import FlashSaleController from './flash-sale.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/', verifyToken, FlashSaleController.FindAll)

export default router
