import { store } from '../../app/store'
import { employeeApiSlice } from '../employees/employeeApiSlice'
import { userApiSlice } from '../buyers/userApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { itemApiSlice } from '../items/itemApiSlice';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const employees = store.dispatch(employeeApiSlice.endpoints.getEmployees.initiate())
        const user = store.dispatch(userApiSlice.endpoints.getBuyers.initiate())
        const items= store.dispatch(itemApiSlice.endpoints.getItems.initiate())

        return () => {
            console.log('unsubscribing')
            employees.unsubscribe()
            user.unsubscribe()
            items.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch