import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


 // Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/user_api/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
        query:(user)=>{
            return{
                url:'registration/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-type': 'application/json',
                }
            }
        }
    }),
    
    loginUser: builder.mutation({
        query:(user)=>{
            return{
                url:'login',
                method: 'POST',
                body: user,
                headers: {
                    'Content-type': 'application/json',
                }
            }
        }
    }),
    getLoggedUser: builder.query({
        query:(access_token)=>{
            return{
                url:'userProfile/',
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${access_token}`,
                }
            }
        }
    }),
    changeUserPassword: builder.mutation({
        query:({ actualData, access_token}) => {
            return{
                url:'changePassword/',
                method: 'POST',
                body: actualData,
                headers: {
                    'authorization': `Bearer ${access_token}`,
                }
            }
        }
    })
   
  }),
})

export const {useRegisterUserMutation, useLoginUserMutation, useGetLoggedUserQuery, useChangeUserPasswordMutation} = userAuthApi