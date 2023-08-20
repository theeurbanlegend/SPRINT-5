import React from 'react'
import '../css/staffdash.css'
import { Link } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import Receiver from '../Chat/Receiver';
const StaffDashboard = ({username}) => {
  const [sendLogout]=useSendLogoutMutation()
  const navigate=useNavigate()

  const handleLogout=()=>{
    sendLogout().unwrap()
    .then((result)=>{
      navigate('/')
      console.log("Logged Out Successfully", result)
    })
    .catch((err)=>{
      console.log("Error logging Out ",err)
    })
  }
  

  return (
    
  <div className="dashboard-container">
  <div className="sidebar">
    <h2>Dashboard Menu</h2>
    <ul>
      <Link to='/' className='li'>Home</Link>
      <Link to='/staff/receive' className='li notification'>Notifications
      <span class="badge">3</span></Link>
      
      
      <Link onClick={()=>{handleLogout()}} className='li'>Logout</Link>
    </ul>
  </div>
  <div className="content">
    <h1>Welcome: {username}</h1>
    
    <div className="staff-profile-card">
      <img className="staff-profile-image" src="/img.jpg" alt="Staff Profile Image"/>
      <div className="staff-profile-info">
        <h3>{username}</h3>
        <p>Email: john@example.com</p>
        
      </div>
     
      
    </div>
    
  </div>
  </div>
  )
}

export default StaffDashboard


