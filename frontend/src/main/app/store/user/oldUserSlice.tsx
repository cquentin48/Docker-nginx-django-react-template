export const vara = 1;
/*
export interface UserSliceState {
    message?: MessageNotification
}

const initialState: UserSliceState = {
    message: undefined
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authenticate: (state, input: PayloadAction<AuthInput>) => {
            const { username, password } = input.payload;
            const updatedState = state;
            UserFactory.authenticate(username, password)
                .then((response) => {
                    if (response instanceof Error) {
                        throw response;
                    }
                    return response;
                })
                .then((_) => {
                    const localisedText = localizedStrings.formatString(
                        "SUCCESSFUL_LOGIN"
                    ) as string;
                    updatedState.message = new MessageNotification(localisedText, "error");
                })
                .catch((_) => {
                    const localisedText = localizedStrings.formatString(
                        "FAILED_LOGIN"
                    ) as string;
                    updatedState.message = new MessageNotification(localisedText, "error");
                });
        }
    }
});

export const { authenticate } = userSlice.actions;

export default userSlice.reducer;
*/
