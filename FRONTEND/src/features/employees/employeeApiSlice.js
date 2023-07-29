import { apiSlice } from '../../app/api/apiSlice'

export const employeeApiSlice =apiSlice.injectEndpoints({
   // the get, post, patch, delete queries are added here
    endpoints:(builder)=>({
        getEmployees: builder.query({
            query:()=>'./work',
            providesTags:['Employees']
        }),
        addEmployee: builder.mutation({
            query:(employee)=>({
                url:'/work',
                method:'POST',
                body:employee
            }),
            invalidatesTags:['Employees']
        }),
        updateEmployee:builder.mutation({
            query:(employee)=>({
                url:`/work/${employee._id}`,
                method:'PATCH',
                body:employee
            }),
            invalidatesTags:['Employees']
        }),
        deleteEmployee:builder.mutation({
            query:(id)=>({
                url:`/work/${id}`,
                method:'DELETE',
                body:id
            }),
            invalidatesTags:['Employees']
        })

    })
})

export const { useGetEmployeesQuery,useDeleteEmployeeMutation,useAddEmployeeMutation,useUpdateEmployeeMutation}=employeeApiSlice