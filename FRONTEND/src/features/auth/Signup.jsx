import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/signup.css'
import { useAddBuyerMutation} from '../buyers/userApiSlice'
import { useLoginUserMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import { useDispatch } from 'react-redux'
import usePersist from '../../hooks/usePersist'
import Spinner from '../spinner/Spinner'

const Signup = () => {
  const [firstName,setFirstName]=React.useState('')
  const [lastName,setLastName]=React.useState('')
  const [phone,setPhone]=React.useState('')
  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  
  const [response,setResponse]=React.useState('')
  const [persist, setPersist] = usePersist(); // Step 2: Use the usePersist hook
  const [error,setError]=React.useState('')
  const [addBuyer, { isLoading: isAddingBuyer, isSuccess: addBuyerSuccess }] = useAddBuyerMutation();
  const [loginUser, { isLoading: isLoggingIn, isSuccess: loginUserSuccess }] = useLoginUserMutation();

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const buyer={
      firstName:firstName,
      lastName:lastName,
      phone:phone,
      email:email,
      username:firstName,
      password:password,
      roles:['User']
    }
    try {
      // Create a new user
      await addBuyer(buyer).unwrap();

      // Log in the newly created user
      const loginResponse = await loginUser(buyer).unwrap();
      const { accessToken } = loginResponse;
      console.log(accessToken)
      // Store the access token in local storage
      localStorage.setItem('accessToken', accessToken);
      // Update the Redux state with the new credentials
      dispatch(setCredentials({ accessToken })); // Dispatch the setCredentials action
      setResponse('User created and logged in successfully');
      console.log('User created and logged in successfully')
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setPassword('');
      navigate('/user');
  } catch (err) {
      setError(err.data?.msg || 'An error occurred');
  }
  }
  let content=(
    <div className='signup-div'>
        <form onSubmit={handleSubmit} className="signup-container">
          <p className="signup-title">Create Account</p>
          <p>Shop with us today!</p>
          <label htmlFor='firstName'>FirstName:
            <input 
            type="text"
            className="signup-input"
            id='firstName'
            onChange={e=>setFirstName(e.target.value)}
            value={firstName}
            />
          </label>
          <label htmlFor='lastName'>LastName:
            <input 
            type="text"
            className="signup-input"
            id='lastName'
            onChange={e=>setLastName(e.target.value)}
            value={lastName}
            />
          </label>
          <label htmlFor='Email'>Email:
            <input 
            type="email"
            className="signup-input"
            id='Email'
            onChange={e=>setEmail(e.target.value)}
            value={email}
            />
          </label>
          <label htmlFor='phone'>Phone:
            <input 
            type="tel"
            className="signup-input"
            placeholder='07...'
            id='phone'
            onChange={e=>setPhone(e.target.value)}
            value={phone}
            />
          </label>
          <br/>
          <label htmlFor='password'>Password:
          <input 
          type="password"
          className="signup-input" 
          id='password'
          onChange={e=>setPassword(e.target.value)}
          value={password}
          />
          </label>
          <br/>
          <label htmlFor="persist">Remember signup:</label>
          <input
            type="checkbox"
            className="persist-checkbox"
            id="persist"
            onChange={() => setPersist((prev) => !prev)}
            checked={persist}
          />
          <button className="signup-button">Create Account</button>
          
        </form>
    </div>
  )
  if (isAddingBuyer||isLoggingIn){
    content=( <>
    <Spinner/>
    <p>Signing You In...</p>
            </>)
  }
  return content
}

export default Signup