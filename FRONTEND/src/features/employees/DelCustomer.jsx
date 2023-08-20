import React from 'react'
import {useGetBuyersQuery,useDeleteBuyerMutation} from '../buyers/userApiSlice'
import { useNavigate } from 'react-router-dom'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BuyersList = () => {
  const {data:buyers,isLoading,isSuccess,isError,error}=useGetBuyersQuery()
  const navigate=useNavigate()
  const [deleteItem]=useDeleteBuyerMutation()

  const handleDelete=(id)=>{
    deleteItem(id).unwrap()
    .then(result=>{
      console.log("Item removed successfully")
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  let content
  if(isLoading){
    content= <p>Loading...</p>
  }else if(isSuccess){
    content=
    <table className="item-table">
    <thead>
      <tr>
        <th>Customer First name</th>
        <th>Customer Last name</th>
        <th>Tel No.</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {buyers.map((buyer) => (
        <tr key={buyer._id}>
          
          <td>{buyer.firstName}</td>
          <td>{buyer.lastName}</td>
          <td>{buyer.phone}</td>
          <td>{buyer.email}</td>
          <td>
          <FontAwesomeIcon className='del-icon' onClick={()=>handleDelete(buyer._id)} icon={faTrashCan}/>
          </td>
        </tr>
      ))} 
    </tbody>
  </table>
  }else if(isError){
    content=(<p>{error}</p>)
  }
  
  
  
  return (
    <>
    <button onClick={()=>navigate('/admin')}>Back to admin</button>
    <div>{content}</div>
    </>
    
  )
}

export default BuyersList