import express from 'express'
import ShopController from './shop.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/:shopid/posts', verifyToken, ShopController.FindItems)
router.get('/:shopid', verifyToken, ShopController.Find)

export default router
