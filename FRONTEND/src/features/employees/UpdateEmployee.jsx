import React from 'react'
import { useGetEmployeesQuery,useUpdateEmployeeMutation } from './employeeApiSlice'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const UpdateEmployee = () => {

  const { empId } = useParams(); 
  const [username,setUsername]=React.useState('')
  const [password,setPassword]=React.useState('')
  const [roles,setRoles]=React.useState([])
  const { data: employee, isLoading, isSuccess } = useGetEmployeesQuery(empId); // Fetch employee details
  const [response,setResponse]=React.useState('')
  const [error,setError]=React.useState('')
  const [updateEmployee]=useUpdateEmployeeMutation()
  const navigate=useNavigate()
  React.useEffect(() => {
    
    // Update the form fields with the employee details once the data is fetched
    if (isSuccess && employee) {
        const foundEmployee = employee.find((one) => one._id === empId);
      setUsername(foundEmployee.username);
      setPassword(foundEmployee.password)
      setRoles(foundEmployee.roles);
    }
  }, [isSuccess, employee]);

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
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const employee={
        _id:empId,
      username:username,
      password:password,
      roles:roles
    }
    try {
      await updateEmployee(employee).unwrap();
      setResponse('Employee updated successfully');
      navigate('/admin');
  } catch (err) {
    console.log(err)
      setError(err.data?.message || 'An error occurred');
  }
  }
  return (
    <div className='update-div'>
  <form onSubmit={handleSubmit} className="update-container">
      <p className="update-title">Update Employee</p>
      {isSuccess && employee ? (
        <>
          <label htmlFor='username'>Employee Name:
        <input 
        type="text"
        className="update-input"
        id='username'
        onChange={e=>setUsername(e.target.value)}
        value={username}
        />
      </label>
      <br />
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
          <br />
          <button className="update-button">Update Employee</button>
        </>
      ) : isLoading ? (<p>Loading...</p>
      ) : (
        // Show an error message if data fetching fails
        <p>{error}</p>
      )}
  
  </form>
  </div>
  )
}

export default UpdateEmployee