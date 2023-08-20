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
    content=(
      <div className="item-grid">
        {items.map((item) =>(
          <div  key={item._id} className="product">
              <img className="product_img" src='hi' alt="Product 1" />
              <h3>{item.itemname}</h3>
              <p>{item.desc}</p>
              <p>In Stock: {item.inStock}</p>
              <p>Price: {item.price} Ksh</p>
              <button onClick={()=>{handleClick(item._id)}}>Add to Cart</button>
          </div>))}  
      </div>                    
        )
  }else if(isError){
    content=(<p>{error}</p>)
  }

  return (
    <div className='body'>
            <header>
               <div>
                <h1 >MuvAs E-Shop</h1>
                <p>Welcome: {username}</p>
                </div>
                <div className="navigation">
                <ul >
                  <li><Link to="/user/cart">Cart</Link></li>
                  <li><Link onClick={()=>{handleLogout()}}>Logout</Link></li>
                </ul>
              </div>
            </header>

            <main className="container"> 
              <p>Our Products</p>
              <div>{content}</div>
            </main>

        <footer>
          <div className="container">
            &copy; 2023 MuvAs E-Shop. All rights reserved.
          </div>
        </footer>
    </div>
  )
}

export default UserDashboard