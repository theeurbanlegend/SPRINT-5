import { apiSlice } from '../../app/api/apiSlice'
export const itemApiSlice =apiSlice.injectEndpoints({
    // the get, post, patch, delete queries are added here
    endpoints:(builder)=>({
        getItems: builder.query({
            query:()=>'./items',
            providesTags:["Items"]
        }),
        addItem: builder.mutation({
            query:(item)=>({
                url:'/items',
                method:'POST',
                body:item
            }),
            invalidatesTags:['Items']
        }),
        updateItem:builder.mutation({
            query:(item)=>({
                url:`/items/${item._id}`,
                method:'PATCH',
                body:item
            }),
            invalidatesTags:['Items']
        }),
        deleteItem:builder.mutation({
            query:({id})=>({
                url:`/items/${id}`,
                method:'DELETE',
                body:id
            }),
            invalidatesTags:['Items']
        }),
        addToCart: builder.mutation({
            query: ({ buyerId, itemId }) => ({
              url: '/buy',
              method: 'POST',
              body: { buyerId, itemId },
            }),
            invalidatesTags:['Items']
          }),
        deleteFromCart: builder.mutation({
            query: ({ buyerId, itemId }) => ({
              url: '/buy',
              method: 'DELETE',
              body: { buyerId, itemId },
            }),
            invalidatesTags:['Items']
        })  
    })
})

export const { useGetItemsQuery,useAddItemMutation,useDeleteItemMutation,useUpdateItemMutation,useAddToCartMutation,useDeleteFromCartMutation}=itemApiSlice