import React from 'react'
import '../features/css/homepage.css'
import { Link } from 'react-router-dom'
const Homepage = () => {
  const address = {
    street: 'Kagumo',
    city: 'Kirinyaga',
    postalCode: '10300',
  };
  const shopDescription = `
Welcome to our online shop!

Our mission is to provide high-quality products at affordable prices, delivered to your doorstep with utmost care. Customer satisfaction is our top priority, and we strive to make your shopping experience enjoyable and hassle-free.

Browse through our collections and discover exciting deals and discounts. Stay tuned for special promotions and seasonal offers.

Thank you for choosing us as your preferred online shopping destination. Happy shopping!
`;

  
  return (
<div className='homepage-div'>
    <header>
        <h1>Welcome to Muvas E-Shop</h1>
        <nav>
            <ul>
                <li><Link to="#">Home</Link></li>
                <li><Link to="#">Contact</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
            </ul>
        </nav>
        
    </header>

    <main>
      
      <p>{shopDescription}</p>

      <p>We are located at:{address.street},{address.city},{address.postalCode} Buy from Us!</p>
    </main>
</div>

  )
}

export default Homepage