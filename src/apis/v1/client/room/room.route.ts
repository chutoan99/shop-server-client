import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import RoomController from './room.controller'

const router = express.Router()

router.get('/', verifyToken, RoomController.FindAll)
router.post('/', verifyToken, RoomController.Create)

export default router
