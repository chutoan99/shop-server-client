import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import CartController from './cart.controller'

const router = express.Router()

router.get('/', verifyToken, CartController.FindAll)
router.post('/', verifyToken, CartController.Create)
router.put('/:cartid', verifyToken, CartController.Update)
router.delete('/:cartid', verifyToken, CartController.Delete)

export default router
