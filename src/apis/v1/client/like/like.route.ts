import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import LikeController from './like.controller'

const router = express.Router()

router.get('/', verifyToken, LikeController.FindAll)
router.post('/', verifyToken, LikeController.Create)
router.delete('/:id', verifyToken, LikeController.Delete)

export default router
