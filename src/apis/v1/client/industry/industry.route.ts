import express from 'express'
import IndustryController from './industry.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/', verifyToken, IndustryController.FindAll)
router.get('/category', verifyToken, IndustryController.Search)

export default router
