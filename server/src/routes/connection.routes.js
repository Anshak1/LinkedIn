import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { sendConnectionReq, acceptConnectionReq, rejectConnectionReq, getConnectionStatus, getAllConnectionReq, getAllUserConnection, removeConnection } from '../controllers/connection.controllers.js'

let connectionRouter = express.Router()

connectionRouter.post('/send/:receiverId', isAuth, sendConnectionReq)
connectionRouter.put('/accept/:connectionId', isAuth, acceptConnectionReq)
connectionRouter.put('/reject/:connectionId', isAuth, rejectConnectionReq)
connectionRouter.get('/get-status/:userId', isAuth, getConnectionStatus) // userId is id of other targeted user
connectionRouter.delete('/remove/:userId', isAuth, removeConnection) // userId is id of other targeted user
connectionRouter.get('/requests/', isAuth, getAllConnectionReq)
connectionRouter.get('/', isAuth, getAllUserConnection)

export default connectionRouter