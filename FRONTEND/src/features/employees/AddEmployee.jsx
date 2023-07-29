import React from 'react'
import { useAddEmployeeMutation } from './employeeApiSlice'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
  const [username,setUsername]=React.useState('')
  const [password,setPassword]=React.useState('')
  const [roles,setRoles]=React.useState([])
  
  const [response,setResponse]=React.useState('')
  const [error,setError]=React.useState('')
  const [addEmployee]=useAddEmployeeMutation()
  const navigate=useNavigate()
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const employee={
      username:username,
      password:password,
      roles:roles
    }
    try {
      // Create a new employee
      await addEmployee(employee).unwrap();
      setResponse('Employee added successfully');
      setUsername('');
      setPassword('');
      navigate('/admin');
  } catch (err) {
      setError(err.data?.message || 'An error occurred');
  }
  }
  const handleRoleChange = (e) => {
    const roleValue = e.target.value;
    if (e.target.checked) {
      // Add the role to the roles array if checked
      setRoles((prevRoles) => [...prevRoles, roleValue]);
    } else {
      // Remove the role from the roles array if unchecked
      setRoles((prevRoles) => prevRoles.filter((role) => role !== roleValue));
    }
  };

  return (
    <div className='add-emp-div'>
  <form onSubmit={handleSubmit} className="addemp-container">
      <p className="addemp-title">New Employee</p>
      <label htmlFor='username'>Employee Name:
        <input 
        type="text"
        className="addemp-input"
        id='username'
        onChange={e=>setUsername(e.target.value)}
        value={username}
        />
      </label>
      <br/>
      <label>Roles:</label>
          <br />
          <label htmlFor="admin">
            Admin:
            <input
              type="checkbox"
              id="admin"
              value="Admin"
              checked={roles.includes('Admin')}
              onChange={handleRoleChange}
            />
          </label>
          <label htmlFor="employee">
              Employee:
            <input
              type="checkbox"
              id="employee"
              value="Employee"
              checked={roles.includes('Employee')}
              onChange={handleRoleChange}
            />
     </label>
     <br/>
      <label htmlFor='password'>Passcode:
        <input 
        type="password"
        className="addemp-input"
        id='password'
        onChange={e=>setPassword(e.target.value)}
        value={password}
        />
      </label>
      <button className="addemp-button">Register Employee</button>
  
  </form>
  </div>
  )
}

export default AddEmployee