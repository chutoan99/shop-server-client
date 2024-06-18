import express from 'express'
import TopProductController from './top-product.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/', verifyToken, TopProductController.FindAll)

export default router
