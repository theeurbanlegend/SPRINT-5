import { useGetItemsQuery,useAddToCartMutation } from '../items/itemApiSlice'
import '../css/userdash.css'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useSendLogoutMutation } from '../auth/authApiSlice';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const {data:items,isLoading,isSuccess,isError,error}=useGetItemsQuery();
  const {username}=useAuth()
  const navigate=useNavigate()
  const [addToCart]=useAddToCartMutation()
  const [sendLogout]=useSendLogoutMutation()
  const handleClick = (itemId) => {
      // Call the addToCart mutation with buyerId and itemId
      addToCart({ buyerId: username, itemId })
        .unwrap()
        .then(() => {
          console.log('Item added to cart successfully.');
        })
        .catch((err) => {
          console.error('Error adding item to cart:', err);
        });
    };
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

  let content
  if (isLoading){
    content=( <p>Loading...</p>)
  }else if(isSuccess){
    console.log(items)
    content=items.map((item)=>(
          <div className="product" key={item._id}>
            <h3>Product Name:{item.itemname}</h3>
            <p>Desc: {item.desc}</p>
            <p>In Stock:{item.inStock}</p>
            <p>Ksh {item.price}</p>
            <button onClick={()=>{handleClick(item._id)}}>Add to Cart</button>
          </div>
        
    ))
  }else if(isError){
    content=(<p>{error}</p>)
  }

  return (
    <div className='body'>
            <header>
              <div>
                <h1 >MuvAs E-Shop</h1>
                <p>Welcome: {username}</p>
                <ul className="navigation">
                  <li><Link to="#">Shop</Link></li>
                  <li><Link to="/user/cart">Cart</Link></li>
                  <li><Link onClick={()=>{handleLogout()}}>Logout</Link></li>
                </ul>
              </div>
            </header>

            <main className="container"> 
            <p>Our Products</p>
            {content}</main>

        <footer>
          <div className="container">
            &copy; 2023 MuvAs E-Shop. All rights reserved.
          </div>
        </footer>
    </div>
  )
}

export default UserDashboard