import React from 'react'
import { useAddItemMutation } from './itemApiSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const AddItem = () => {
  const [itemname,setItemname]=React.useState('')
  const [inStock,setInStock]=React.useState('')
  const [price,setPrice]=React.useState('')
  const [desc,setDesc]=React.useState('')
  const [imageFile, setImageFile] = React.useState(null);
  const [response,setResponse]=React.useState('')
  const [error,setError]=React.useState('')
  const [addItem]=useAddItemMutation()
  const navigate=useNavigate()
  const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024



const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (file && file.size > MAX_IMAGE_SIZE_BYTES) {
    setError('Image size exceeds the limit.')
    toast.error('Image size exceeds the limit.')

    setImageFile(null)
  } else {
    setImageFile(file)
    setError('')
  }
};
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append('itemname', itemname);
    formData.append('inStock', inStock);
    formData.append('price', price);
    formData.append('desc', desc);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    try {
      // Create a new item
      await addItem(formData).unwrap()
      setResponse('Item added successfully')
      console.log(response)
      setItemname('')
      setInStock('')
      setPrice('')
      setDesc('')
      setImageFile(null)
      navigate('/admin/items')
  } catch (err) {
      setError(err.data?.message || 'An error occurred')
  }
  }
  return (
    <div className='additem-div'>
  <form onSubmit={handleSubmit} className="additem-container">
      <p className="additem-title">Add Item</p>
      <label htmlFor='itemname'>Item Name:
        <input 
        type="text"
        className="additem-input"
        id='itemname'
        onChange={e=>setItemname(e.target.value)}
        value={itemname}
        />
      </label>
      <br/>
      <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          
          accept="image/*"
          onChange={handleImageChange}
        />
      <br/>
      <label htmlFor='inStock'>InStock:
        <input 
        type="number"
        className="additem-input" 
        id='inStock'
        onChange={e=>setInStock(e.target.value)}
        value={inStock}
        />
      </label>
      <br />
      <label htmlFor='price'>Price:
        <input 
        type="number"
        className="additem-input"
        id='price'
        onChange={e=>setPrice(e.target.value)}
        value={price}
        />
      </label>
      <br />
      <label htmlFor='desc'>Desc:
        <input 
        type="text"
        className="additem-input"
        id='desc'
        onChange={e=>setDesc(e.target.value)}
        value={desc}
        />
      </label>
      <button className="additem-button">Add Item</button>
  </form>
  <ToastContainer/>
  </div>
  )
}

export default AddItem