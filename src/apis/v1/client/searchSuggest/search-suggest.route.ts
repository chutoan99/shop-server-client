import express from 'express'
import SearchSuggestController from './search-suggest.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/', verifyToken, SearchSuggestController.FindAll)

export default router
