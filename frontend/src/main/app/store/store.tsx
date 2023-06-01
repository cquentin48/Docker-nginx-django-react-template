import { configureStore } from "@reduxjs/toolkit";
import { api } from "./user/userSlice";

/*
import UserSlice, { type UserSliceState } from "./user/userSlice";
import { type ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

export const store = configureStore({
    reducer: {
        user: UserSlice
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare().concat()
}
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = ToolkitStore<
{
    user: UserSliceState
},
AnyAction,
[
    ThunkMiddleware<
    {
        user: UserSliceState
    },
    AnyAction
    >
]
>;
*/

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware)
})
