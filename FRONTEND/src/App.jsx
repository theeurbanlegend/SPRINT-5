import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import UserDashboard from './features/buyers/UserDashboard';
import StaffDashboard from './features/employees/StaffDashboard';
import AdminDash from './features/employees/AdminDash';
import NotFound from './components/NotFound';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import Prefetch from './features/auth/preFetch';
import ItemsList from './features/items/ItemsList';
import CartItems from './features/buyers/CartItems';
import Homepage from '../src/components/Homepage'
import AddItem from '../src/features/items/AddItem'
import UpdateItem from './features/items/UpdateItem';
import UpdateEmployee from './features/employees/UpdateEmployee'
import AddEmployee from './features/employees/AddEmployee';
import DelCustomer from './features/employees/DelCustomer'
import useAuth from './hooks/useAuth';
import Message from './features/Chat/Messenger';
import Receiver from './features/Chat/Receiver';
import Notifications from './features/Chat/Notifications';
// import { NotificationProvider } from './features/employees/NotificationProvider';

function App() {
  const authData=useAuth()
  return(
  <Router>
     
    <Routes>
      <Route index element={<Homepage/>}/>
      <Route  path="/signup" element={<Signup/>} />
      <Route path="login" element={<Login/>} />
      
      <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      
      <Route element={<PersistLogin/>}>
        <Route element={<Prefetch/>}>
          <Route path="user" element={<RequireAuth allowedRoles={'User'}/>}>
            <Route path="/user" element={<UserDashboard/>} />
            <Route path='/user/cart' element={<CartItems/>}/>
          </Route>

          <Route path="staff" element={<RequireAuth allowedRoles={'Employee'}/>}>
            <Route path="/staff" element={<StaffDashboard {...authData}/>} />
            <Route path="/staff/receive" element={<Notifications {...authData}/>} />
          </Route>

          <Route path="admin" element={<RequireAuth allowedRoles={['Admin']} />}>
            <Route exact path="/admin" element={<AdminDash {...authData}/>} />
            <Route path='/admin/items' element={<ItemsList/>}/>
            <Route path='/admin/items/new' element={<AddItem/>}/>
            <Route exact path='/admin/items/update/:itemId' element={<UpdateItem/>}/>
            <Route exact path='/admin/work/update/:empId' element={<UpdateEmployee/>}/>
            <Route exact path='/admin/work/new' element={<AddEmployee/>}/>
            <Route  path='/admin/remove' element={<DelCustomer/>}/>
            <Route path='/admin/mess' element={<Message/>}/>
          </Route>

        </Route>
      </Route>
    </Routes>
  </Router>
  )
}

export default App
