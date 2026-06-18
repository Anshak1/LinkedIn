import React from 'react'
import { TopBar2 } from './TopBar2'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'
import { useEffect } from 'react'
import axios from 'axios'
import dp from '../assets/dp.jpg'
import moment from 'moment'
import { Check, X } from 'lucide-react'

const Network = () => {
  const { serverUrl } = useContext(authDataContext)
  const { userData } = useContext(userDataContext)
  const [connections, setConnections] = useState([]) // basically connection requests
  const [userConnections, setUserConnections] = useState([])

  const handleGetAllConnection = async () => {
    try {
      let res = await axios.get(`${serverUrl}/api/connection/`, { withCredentials: true })
      // console.log(res.data)
      setUserConnections(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetConnectionReq = async () => {
    try {
      let res = await axios.get(`${serverUrl}/api/connection/requests/`, { withCredentials: true })
      // console.log(res.data)
      setConnections(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAcceptReq = async (connectionId) => {
    try {
      let res = await axios.put(`${serverUrl}/api/connection/accept/${connectionId}`, {}, { withCredentials: true })
      //console.log(res.data)
      setConnections((prev) => prev.filter((conn) => conn._id !== connectionId))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRejectReq = async (connectionId) => {
    try {
      let res = await axios.put(`${serverUrl}/api/connection/reject/${connectionId}`, {}, { withCredentials: true })
      // console.log(res.data)
      setConnections((prev) => prev.filter((conn) => conn._id !== connectionId))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetConnectionReq()
    handleGetAllConnection()
  }, [])
  return (
    <div className='bg-[#F4F2EE] pt-16 lg:pt-20 min-h-screen w-full flex flex-col items-center justofy-center gap-4 px-10'>
      <TopBar2 />
      <div className="rounded-lg shadow-md bg-white w-full md:w-1/2 py-2 px-8 flex flex-col gap-2">
        <p className="">Invitations &nbsp;&nbsp; {connections.length}</p>
        <p className="">See Connections &nbsp;&nbsp; {userConnections.length}</p>
      </div>
      <div className="flex flex-col items-start justify-center w-full md:w-1/2 gap-3">
        {connections.map((c, i) => (
          <div key={i} className="flex center justify-between bg-white shadow-md rounded-lg w-full px-4 py-4">
            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-full">
                <img src={c?.sender?.profileImage || dp} alt="" className="w-full h-full bg-cover rounded-full" />
              </div>
              <div className="">
                <h1 className="text-base font-semibold -mt-1">{c?.sender?.firstName + ' ' + c?.sender?.lastName}</h1>
                <h3 className="text-gray-600 text-sm -mt-1">{c?.sender?.headline}</h3>
                <p className="text-xs -mt-1">{moment(c.createdAt).fromNow()}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button
                  onClick={() => handleAcceptReq(c._id)} 
                  className="border w-8 h-8 p-1 flex items-center justify-center border-gray-300 hover:bg-blue-500/20 cursor-pointer rounded-full">
                  <Check className='text-sm text-blue-500'/>
                </button>
              <button
                  onClick={() => handleRejectReq(c._id)} 
                  className="border w-8 h-8 p-1 flex items-center justify-center border-gray-300 hover:bg-red-500/20 cursor-pointer rounded-full">
                  <X className='text-sm text-red-500'/>
                </button>
            </div>
          </div>
        ))}
        {connections.length == 0 && <div className='w-full py-4 rounded-lg shadow-md px-8 bg-white'>
          <p className="text-base text-gray-600">No pending invitations</p>
        </div>}
      </div>
    </div>
  )
}

export default Network