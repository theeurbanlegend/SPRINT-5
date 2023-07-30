import React from 'react'
import { useUpdateItemMutation,useGetItemsQuery} from './itemApiSlice'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const UpdateItem = () => {

  const { itemId } = useParams(); 
  const [itemname,setItemname]=React.useState('')
  const [inStock,setInStock]=React.useState('')
  const [price,setPrice]=React.useState('')
  const [desc,setDesc]=React.useState('')
  const { data: item, isLoading, isSuccess } = useGetItemsQuery(); // Fetch item details
  const [response,setResponse]=React.useState('')
  const [error,setError]=React.useState('')
  const [updateItem]=useUpdateItemMutation()
  const navigate=useNavigate()

  React.useEffect(() => {
    // Update the form fields with the item details once the data is fetched
    if (isSuccess && item) {
        const foundItem = item.find((one) => one._id === itemId);
      setItemname(foundItem.itemname);
      setInStock(foundItem.inStock);
      setPrice(foundItem.price);
      setDesc(foundItem.desc);
    }
  }, [isSuccess, item]);
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const item={
        _id:itemId,
      itemname:itemname,
      inStock:inStock,
      price:price,
      desc:desc
    }
    try {
      // Create a new item
      await updateItem(item).unwrap();
      setResponse('Item added successfully');
      console.log(response)
      navigate('/admin/items');
  } catch (err) {
      setError(err.data?.message || 'An error occurred');
  }
  }
  return (
    <div className='update-div'>
  <form onSubmit={handleSubmit} className="update-container">
      <p className="update-title">Update Item</p>
      {isSuccess && item ? (
        <>
          <label htmlFor='itemname'>Item Name:
        <input 
        type="text"
        className="update-input"
        id='itemname'
        onChange={e=>setItemname(e.target.value)}
        value={itemname}
        />
      </label>
      <br/>
      <label htmlFor='inStock'>InStock:
        <input 
        type="number"
        className="update-input" 
        id='inStock'
        onChange={e=>setInStock(e.target.value)}
        value={inStock}
        />
      </label>
      <br />
      <label htmlFor='price'>Price:
        <input 
        type="number"
        className="update-input"
        id='username'
        onChange={e=>setPrice(e.target.value)}
        value={price}
        />
      </label>
      <br />
      <label htmlFor='itemname'>Desc:
        <input 
        type="text"
        className="update-input"
        id='username'
        onChange={e=>setDesc(e.target.value)}
        value={desc}
        />
      </label>
          {/* Rest of the form fields */}
          <br />
          <button className="update-button">Update Item</button>
        </>
      ) : isLoading ? ( // Show a loading message while fetching item data
        <p>Loading...</p>
      ) : (
        // Show an error message if data fetching fails
        <p>{error}</p>
      )}
  
  </form>
  </div>
  )
}

export default UpdateItem