import express from 'express'
import BannerController from './banner.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/', verifyToken, BannerController.FindAll)

export default router
