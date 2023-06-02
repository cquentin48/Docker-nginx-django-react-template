import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type APIError, type APIResponse, type LoginInput } from "../../model/user/httpRequestInterfaces";

export const api = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
        baseUrl: 'http://0.0.0.0:8000/api/v1/'
    }),
    tagTypes: ['User'],
    endpoints: build => ({
        login: build.mutation<APIResponse | APIError, LoginInput>({
            /*
            query (userAuthInput) {
                return {
                    url: `user/auth`,
                    method: 'POST',
                    body: userAuthInput
                }
            },
            transformErrorResponse: (
                response: { status: string | number },
                _,
                __
            ) => response.status
            */
            query: (body: LoginInput) => ({
                url: 'user/auth',
                method: 'POST',
                body
            })
        })
    })
})

export const {
    useLoginMutation
} = api;

/*
    login : build.mutation({
      query: ({username,password}) => ({
        url: `user/auth`,
        method: 'POST',
        body: {username,password}
      }),
      transformResponse: (response : {data: APIResponse}, _, __) =>
        response.data,
      transformErrorResponse: ( response: { status  : string | number }, _, __ ) =>
      response.status
    })
  })
  */
