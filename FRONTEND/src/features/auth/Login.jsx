import React from 'react';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginUserMutation, useLoginEmployeeMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [isuser, setisUser] = React.useState(true);
  const navigate = useNavigate();
  const [loginEmployee] = useLoginEmployeeMutation();
  const [loginUser] = useLoginUserMutation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [error, setError] = React.useState('');
  const {roles,status}=useAuth()
  console.log(status)
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
      const { accessToken} = isuser
        ? await loginUser(credentials).unwrap()
        : await loginEmployee(credentials).unwrap();
      
      // Dispatch the setCredentials action
      dispatch(setCredentials({ accessToken }));

      setResponse(` ${isuser ? 'Customer' : 'Employee'} ${username} logged in successfully.`);
      
      setUsername('');
      setPassword('');
      console.log(accessToken, isuser)
      // Navigate to the appropriate route based on isuser state
      if (status==='Admin') {
        console.log("admin")

        navigate('/admin');
      } else if (isuser) {
        navigate('/user');
      } else {
        // Handle any other roles or unknown cases here
        navigate('/staff');
      }
    } catch (err) {
      setError(err.data?.msg || 'An error occurred');
      console.log(err)
    }
  };

  return (
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
  );
};

export default Login;
