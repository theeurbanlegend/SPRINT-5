import { apiSlice } from "../../app/api/apiSlice"
import { logOut,setCredentials} from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
              url: '/auth/users',
              method: 'POST',
              body: { ...credentials },
            }),
          }),
        loginEmployee: builder.mutation({
            query: (credentials) => ({
              url: '/auth/work',
              method: 'POST',
              body: {...credentials},
            }),
          }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState())
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const {accessToken}=data
                    dispatch(setCredentials({accessToken}))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useLoginUserMutation,
    useLoginEmployeeMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 

// Update this to handle the login response and store the access token
export const loginUser = (credentials) => async (dispatch) => {
    console.log(credentials)
    try {
        const loginResponse = await useLoginUserMutation(credentials).unwrap();
        const { accessToken } = loginResponse;

        localStorage.setItem('accessToken', accessToken);

        dispatch(setCredentials({ accessToken }));

        return loginResponse;
    } catch (err) {
        throw err;
    }
};