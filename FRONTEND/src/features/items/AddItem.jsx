import React from 'react'
import { useAddItemMutation } from './itemApiSlice'
import { useNavigate } from 'react-router-dom'

const AddItem = () => {
  const [itemname,setItemname]=React.useState('')
  const [inStock,setInStock]=React.useState('')
  const [price,setPrice]=React.useState('')
  const [desc,setDesc]=React.useState('')
  
  const [response,setResponse]=React.useState('')
  const [error,setError]=React.useState('')
  const [addItem]=useAddItemMutation()
  const navigate=useNavigate()
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const item={
      itemname:itemname,
      inStock:inStock,
      price:price,
      desc:desc
    }
    try {
      // Create a new item
      await addItem(item).unwrap();
      setResponse('Item added successfully');
      console.log(response)
      setItemname('');
      setInStock('');
      setPrice('');
      setDesc('');
      navigate('/items');
  } catch (err) {
      setError(err.data?.message || 'An error occurred');
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
  </div>
  )
}

export default AddItem