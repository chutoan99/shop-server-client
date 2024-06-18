import express, { Router } from 'express'
import InsertControllers from './insert.controller'
require('dotenv').config()

const router: Router = express.Router()

router.post('/app', InsertControllers.App)
router.post('/comment/:start/:end', InsertControllers.Comment)
router.post('/post/:start/:end', InsertControllers.Post)
router.post('/shopAndUser/:start/:end', InsertControllers.ShopAndUser)
router.post('/industry', InsertControllers.Industries)

export default router
