/* istanbul ignore file */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type APIError, type APIResponse, type LoginInput } from "../../model/user/httpRequestInterfaces";

export const api = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://0.0.0.0:80/api/v1/'
    }),
    tagTypes: ['User'],
    endpoints: build => ({
        login: build.mutation<APIResponse | APIError, LoginInput>({
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

const initialState = {

}

export const mockAPI = (state = initialState, action: string): void => {
    switch (action) {
        case "REGISTER_SUCCESS":
            break;
    }
}
