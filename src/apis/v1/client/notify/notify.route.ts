import express from 'express'
import NotifyController from './notify.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/', verifyToken, NotifyController.FindAll)

export default router
