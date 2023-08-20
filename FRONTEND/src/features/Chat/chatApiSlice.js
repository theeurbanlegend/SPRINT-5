import { apiSlice } from '../../app/api/apiSlice'
export const chatApiSlice =apiSlice.injectEndpoints({
    // the get, post, patch, delete queries are added here
    endpoints:(builder)=>({
        getMessages: builder.query({
            query:()=>'/mess',
            providesTags:["Messages"]
        }),
        addMessage: builder.mutation({
            query:(message)=>({
                url:'/mess',
                method:'POST',
                body:message
            }),
            invalidatesTags:['Messages']
        }),
        updateMessage:builder.mutation({
            query:(message)=>({
                url:`/mess/${message._id}`,
                method:'PATCH',
                body:message
            }),
            invalidatesTags:['Messages']
        }),
        deleteMessage:builder.mutation({
            query:(id)=>({
                url:`/mess/${id}`,
                method:'DELETE',
                body:id
            }),
            invalidatesTags:['Messages']
        })

    })
})

export const { useGetMessagesQuery,useAddMessageMutation,useDeleteMessageMutation,useUpdateMessageMutation}=chatApiSlice