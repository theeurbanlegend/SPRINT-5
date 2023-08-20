import React from 'react';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginUserMutation, useLoginEmployeeMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import Spinner from '../spinner/Spinner';

const Login = () => {
  const [isuser, setisUser] = React.useState(true);
  const navigate = useNavigate();
  const [loginEmployee, { isLoading: loginEmpIn, isSuccess: LoginEmpSuccess }] = useLoginEmployeeMutation();
  const [loginUser, { isLoading: loginUserIn, isSuccess: LoginUserSuccess }] = useLoginUserMutation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [error, setError] = React.useState('');
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
  const [persist, setPersist] = usePersist(); // Step 1: Use the usePersist hook
  const dispatch = useDispatch();

  // Step 2: Replace your handleSubmit function with the template's handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username: username,
      password: password,
    };

    try {
      let response;
      if (isuser) {
        response = await loginUser(credentials).unwrap();
      } else {
        response = await loginEmployee(credentials).unwrap();
      }

      const { accessToken } = response;
      // Dispatch the setCredentials action
      dispatch(setCredentials({ accessToken }));

      setResponse(` ${isuser ? 'Customer' : 'Employee'} ${username} logged in successfully.`);
      
      setUsername('');
      setPassword('');
      console.log(accessToken, isuser)
      // Navigate to the appropriate route based on isuser state
      if (response?.verified?.roles?.includes("Admin")) {
        navigate('/admin');
      } else if (isuser) {
        navigate('/user');
      } else {
        // Handle other roles or unknown cases here
        navigate('/staff');
      }
    } catch (err) {
      if (err.status === 429) {
      // If the error is due to "Too Many Requests" (status 429)
      const retryAfterSeconds = err.data.retryAfterSeconds;
      setError(`Too many login attempts. Please try again after ${retryAfterSeconds} seconds.`);
      setIsErrorVisible(true); // Show the error message

      // Start the countdown timer
      let remainingTime = retryAfterSeconds;
      const timerInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime <= 0) {
          // Hide the countdown timer and show the error message
          clearInterval(timerInterval);
          setIsErrorVisible(false);
        
        } else {
          // Update the error message with the current remaining time
          setError(`Too many login attempts. Please try again after ${remainingTime} seconds.`);
        }
      }, 1000); // Update the timer every second (1000 milliseconds)
    
}else{
  setError(err.data?.msg || 'An error occurred');
  console.log(err)}

};
}
  let content=(
    <div className="login-div">
        <form className="login-container" onSubmit={handleSubmit}>
          <p className="login-title">{isuser ? 'Customer' : 'Employee'} Login</p>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="login-input"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
              setResponse('');
              setError('');
            }}
            value={username}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="login-input"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setResponse('');
              setError('');
            }}
            value={password}
          />
          <br />
          <button className="login-button">Login</button>
          <p className="toggle">
            <a onClick={() => setisUser(true)}>Customer</a> OR <a onClick={() => setisUser(false)}>Employee</a>
          </p>
          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={() => setPersist((prev) => !prev)}
              checked={persist}
            />
            Trust This Device
          </label>
          <p>{response}</p>
          <p className='login-err'>{error}</p>
        </form>
        </div>
    </div>
  );
  if (loginEmpIn||loginUserIn){
    content=( <>
    <Spinner/>
    <p>Logging You In...</p>
            </>)
  }
  return content
};

export default Login;
