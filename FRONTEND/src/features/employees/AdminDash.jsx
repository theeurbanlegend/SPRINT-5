import React from 'react'
import '../css/admindash.css'
import { useGetEmployeesQuery,useDeleteEmployeeMutation} from './employeeApiSlice'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import Message from '../Chat/Messenger'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const AdminDash = () => {
  const {data:employees,isLoading,isSuccess,isError,error}=useGetEmployeesQuery()
  const [deleteEmployee]=useDeleteEmployeeMutation()
  const navigate=useNavigate()
  const [sendLogout]=useSendLogoutMutation()
  

  const handleLogout=()=>{
    sendLogout().unwrap()
    .then((result)=>{
      navigate('/')
      toast.success(result.msg)
      console.log("Logged Out Successfully", result)
    })
    .catch((err)=>{
      console.log("Error logging Out ",err)
    })
  }
  
  const handleDelete=(id)=>{
    deleteEmployee(id).unwrap()
    .then(result=>{
      toast.success(result.msg)
    })
    .catch(err=>{
      console.log(err)
      toast.error(err.data.msg||'An Error occured')
    })
  }


  let content
  if(isLoading){
    content=(<p>Loading....</p>)
  }else if(isSuccess){
    content=employees.map(one=>(       
        <div className="employee-card" key={one._id}>
          <div className="employee-info">
            <h3>{one.username}</h3>
            <p>Position:{one.roles.join(', ')}</p>
            <button onClick={()=>{navigate(`/admin/work/update/${one._id}`)}} >Update Employee Details</button>
            <br/>
            <FontAwesomeIcon onClick={()=>handleDelete(one._id)} icon={faTrashCan}/>
          </div>
        </div>
    ))
  }else if(isError){
    content=(<p>{error.data.message}</p>)
  }
  
  
  return (
    <div className='all'>
          <header>
            <div className="container">
            <h1 className="logo">Shop Manager Dashboard</h1>
            <ul className="navigation">
                <li><Link onClick={()=>handleLogout()}>Logout</Link></li>
                <li><Link to="/admin/work/new">Add Employee</Link></li>
                <li><Link to='/admin/items'>Inventory</Link></li>
                <li><Link to="/admin/remove">Remove customer</Link></li>
                <li><Link to="/admin/mess">Add Notificatiion</Link></li>
            </ul>
            </div>
      </header>

      <main className="container">
        <h2>Employee List</h2>
        <div className="employee-list">{content}</div>
      </main>
      <ToastContainer/>
      <footer>
        <div >
          &copy; 2023 Shop Manager Dashboard. All rights reserved.
        </div>
      </footer>  
  </div>
  )
}

export default AdminDash