import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import SearchHistoryController from './search-history.controller'

const router = express.Router()

router.get('/', verifyToken, SearchHistoryController.FindAll)
router.post('/', verifyToken, SearchHistoryController.Create)

export default router
