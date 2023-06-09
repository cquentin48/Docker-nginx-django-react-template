import type User from "../../model/user/user";

interface UserActionResult {
    message: string
    state?: {
        user: User
    }
}
const value: UserActionResult = {
    message: "klmk"
};
console.log(value);
/*
export const login = (username: string, password: string): UserActionResult => {
    UserFactory.authenticate(username, password)
        .then((response) => {
            if (response instanceof Error) {
                throw response;
            }
            return response;
        })
        .then((user: User) => {
            locale.loadLocaleStringValue("SUCCESSFUL_LOGIN").then((value) => {
                return {
                    message: lo.loadLocaleStringValue("SUCCESSFUL_LOGIN"),
                    state: {
                        user
                    }
                };
            });
        })
        .catch((_) => {
            return {
                message: locale.loadLocaleStringValue("FAILED_LOGIN")
            };
        });
    throw Error("");
};
*/
