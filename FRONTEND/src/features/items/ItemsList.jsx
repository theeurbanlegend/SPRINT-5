import React from 'react'
import {useGetItemsQuery,useDeleteItemMutation} from './itemApiSlice'
import { useNavigate } from 'react-router-dom'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify'

const ItemsList = () => {
  const {data:items,isLoading,isSuccess,isError,error}=useGetItemsQuery()
  const navigate=useNavigate()
  const [deleteItem]=useDeleteItemMutation()

  const handleDelete=async (id)=>{
    
    await deleteItem(id).unwrap()
    .then(result=>{
      console.log("Item removed successfully")
      console.log(result)
      toast.success(result.status)
    })
    .catch(err=>{
      toast.error(err.data.status)
      console.log(err)
    })
  }

  let content
  if(isLoading){
    content= <p>Loading...</p>
  }else if(isSuccess){
    console.log(items)
    content=(
      (
        <table className="item-table">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>In Stock</th>
              <th>Item Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>
                  <img className="product_img" src={URL.createObjectURL(new Blob([item.image], { type: 'image/jpeg' }))} alt={item.itemname} />
                </td>
              {console.log(URL.createObjectURL(new Blob([item.image], { type: 'image/jpeg' })))}
                <td>{item.itemname}</td>
                <td>{item.desc}</td>
                <td>{item.inStock}</td>
                <td>{item.price} Ksh</td>
                <td>
                  <button onClick={() => navigate(`/admin/items/update/${item._id}`)}>Update Details</button>
                  <FontAwesomeIcon className='del-icon' onClick={() => handleDelete(item._id)} icon={faTrashCan} />
                </td>
              </tr>
            ))} 
          </tbody>
        </table>
      ))
  }else if(isError){
    content=(<p>{error}</p>)
  }
  
  
  
  return (
    <>
    <button onClick={()=>{navigate('/admin')}}>Back To home</button>
    <button onClick={()=>{navigate('/admin/items/new')}}>Add new Item</button>
    <ToastContainer/>
    <div>{content}</div>
    </>
    
  )
}

export default ItemsList