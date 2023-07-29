import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let isUser= false
    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.Info
        console.log(decoded.Info)
        
        isAdmin = roles.includes('Admin')
        isUser=roles.includes('User')

        if (isAdmin) status = "Admin"
        if(isUser) status="User"

        return { username, roles, status,isUser, isAdmin }
    }

    return { username: '', roles: [], isAdmin,isUser, status }
}
export default useAuth