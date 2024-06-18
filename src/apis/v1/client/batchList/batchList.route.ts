import express from 'express'
import BatchListController from './batchList.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/', verifyToken, BatchListController.FindAll)

export default router
