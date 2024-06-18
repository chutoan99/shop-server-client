import express from 'express'
import PostController from './post.controller'
import { verifyToken } from '~/middleWares/jwt'

const router = express.Router()

router.get('/search', verifyToken, PostController.Search)
router.get('/:itemid', verifyToken, PostController.Find)

export default router
