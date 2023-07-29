import React from 'react'
import {useGetItemsQuery,useDeleteItemMutation} from './itemApiSlice'
import { useNavigate } from 'react-router-dom'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ItemsList = () => {
  const {data:items,isLoading,isSuccess,isError,error}=useGetItemsQuery()
  const navigate=useNavigate()
  const [deleteItem]=useDeleteItemMutation()

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
    console.log(items)
    content=items.map((item)=>(
          <div className="item" key={item._id}>
            <img className='product_img' src="/item.jpg" alt="Product 1"/>
            <h3>Product Name:{item.itemname}</h3>
            <p>Desc: {item.desc}</p>
            <p>In Stock:{item.inStock}</p>
            <p>Item price:{item.price} Ksh</p>
            <button onClick={()=>{navigate(`/admin/items/update/${item._id}`)}}>Update Details</button>
            <FontAwesomeIcon onClick={()=>handleDelete(item._id)} icon={faTrashCan}/>
          </div>
        
    ))
  }else if(isError){
    content=(<p>{error}</p>)
  }
  
  
  
  return (
    <>
    <button onClick={()=>{navigate('/admin')}}>Back To home</button>
    <button onClick={()=>{navigate('/admin/items/new')}}>Add new Item</button>
    
    <div>{content}</div>
    </>
    
  )
}

export default ItemsList