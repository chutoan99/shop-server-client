import express from 'express'
import ShopMallController from './shop-mall.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/', verifyToken, ShopMallController.FindAll)

export default router
