import express from 'express'
import isAuth from '../middlewares/isAuth'
import { sendConnection, acceptConnection, rejectConnection } from '../controllers/connection.controllers'

let connectionRouter = express.Router()

connectionRouter.get('/send/:id', isAuth, sendConnection)
connectionRouter.post('/accept/:id', isAuth, acceptConnection)
connectionRouter.post('/reject/:id', isAuth, rejectConnection)

export default connectionRouter