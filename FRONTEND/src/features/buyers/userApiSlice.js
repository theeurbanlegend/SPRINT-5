import { apiSlice } from '../../app/api/apiSlice'
export const userApiSlice =apiSlice.injectEndpoints({
    // the get, post, patch, delete queries are added here
    endpoints:(builder)=>({
        getBuyers: builder.query({
            query:()=>'./users',
            providesTags:["Users"]
        }),
        addBuyer: builder.mutation({
            query:(buyer)=>({
                url:'/signup',
                method:'POST',
                body:buyer
            }),
            invalidatesTags:['Users']
        }),
        updateBuyer:builder.mutation({
            query:(buyer)=>({
                url:`/users/${buyer._id}`,
                method:'PATCH',
                body:buyer
            }),
            invalidatesTags:['Users']
        }),
        deleteBuyer:builder.mutation({
            query:(id)=>({
                url:`/users/${id}`,
                method:'DELETE',
                body:id
            }),
            invalidatesTags:['Users']
        })

    })
})

export const { useGetBuyersQuery,useAddBuyerMutation,useDeleteBuyerMutation,useUpdateBuyerMutation}=userApiSlice