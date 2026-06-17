import Connection from "../models/connection.model"
import User from "../models/user.model"

export const sendConnection = async (req, res) => {
  try {
    const senderId = req.userId
    const recieverId = req.params.id

    if(senderId == recieverId) {
      return res.status(400).json({message: 'you can not request connection to yourself!'})
    }

    const sender = await User.findById(senderId)
    if(sender.connection.includes(recieverId)) {
      return res.status(400).json({message: 'you already connected!'})
    }
    
    let existConnection = await Connection.findOne({
      sender: senderId, reciever: recieverId, status: 'pending'
    })

    if(existConnection) {
      return res.status(400).json({message: 'you already requested connection!'})
    }

    let newConnectionRequest = await Connection.create({sender: senderId, reciever: recieverId})
    return res.status(200).json(newConnectionRequest)
  } catch (error) {
    return res.status(500).json({message: 'request connection error!'})
  }
}

export const acceptConnection = async (req, res) => {
  try {
    const connectionId = req.params.id
    const userId = req.userId

    const connection = await Connection.findById(connectionId)
    if (!connection) {
      return res.status(404).json({message: 'connection request not found!'})
    }

    if (connection.status !== 'pending') {
      return res.status(400).json({message: 'connection request already processed!'})
    }

    if (connection.reciever.toString() !== userId) {
      return res.status(400).json({message: 'you are not the receiver!'})
    }

    connection.status = 'accepted'
    await connection.save()

    await User.findByIdAndUpdate(connection.sender, {
      $push: {connection: connection.reciever}
    })
    await User.findByIdAndUpdate(connection.reciever, {
      $push: {connection: connection.sender}
    })

    return res.status(200).json({message: 'connection accepted!', connection})
  } catch (error) {
    return res.status(500).json({message: 'accept connection error!'})
  }
}

export const rejectConnection = async (req, res) => {
  try {
    const connectionId = req.params.id
    const userId = req.userId

    const connection = await Connection.findById(connectionId)
    if (!connection) {
      return res.status(404).json({message: 'connection request not found!'})
    }

    if (connection.status !== 'pending') {
      return res.status(400).json({message: 'connection request already processed!'})
    }

    if (connection.reciever.toString() !== userId) {
      return res.status(400).json({message: 'you are not the receiver!'})
    }

    connection.status = 'rejected'
    await connection.save()

    return res.status(200).json({message: 'connection rejected!', connection})
  } catch (error) {
    return res.status(500).json({message: 'reject connection error!'})
  }
}