import express from 'express'
import CategoriesTreeController from './category-tree.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/:level', verifyToken, CategoriesTreeController.FindAll)
router.get('/:catid/parent', verifyToken, CategoriesTreeController.Search)

export default router
