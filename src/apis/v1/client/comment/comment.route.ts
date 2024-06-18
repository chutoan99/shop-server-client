import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import fileUploader from '~/configs/cloudinary'
import CommentController from './comment.controller'

const router = express.Router()

router.get('', verifyToken, CommentController.GetAll)
router.post(
	'',
	verifyToken,
	fileUploader.array('images', 5),
	CommentController.Create
)

export default router
