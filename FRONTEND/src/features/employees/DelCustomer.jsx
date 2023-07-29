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
    content=buyers.map((user)=>(
          <div key={user._id}>
            <img className='product_img' src="/img.jpg" alt="Product 1"/>
            <h3>Customer: {user.username}</h3>
            <></>
            <FontAwesomeIcon onClick={()=>handleDelete(user._id)} icon={faTrashCan}/>
          </div>
        
    ))
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