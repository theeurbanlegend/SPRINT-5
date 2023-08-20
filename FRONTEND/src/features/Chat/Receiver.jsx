import { useState ,useEffect} from 'react'
import io from 'socket.io-client'
import '../css/receiver.css'
import useAuth from '../../hooks/useAuth'
const socket=io.connect('http://localhost:8080')

const Receiver = ({messages,onClose,user}) => {
    const [received,setReceived]=useState('')
    console.log(user)
    useEffect(()=>{
        socket.on('receive_message',(data)=>{
          setReceived(data.message)
        })
      },[socket])
    const closeButton=(
    <button className="close-button" onClick={() => onClose(notification._id)}>
    X
  </button>
  )
  const doneButton=(
    <input
    type='checkbox'/>
  )
  return (
    <>
    {!received?<p>"You have no new messages"</p>:<p>"You have new messages"</p>}
    <textarea
    className='note-area'
     value={received}
     readOnly={true}/>
     <div className="notification-container">
      {messages.map((notification) => (
        <div key={notification._id} className="notification">
          <span>{notification.message}</span>
          
        </div>
      ))}
    </div>
     </>
  )
}

export default Receiver