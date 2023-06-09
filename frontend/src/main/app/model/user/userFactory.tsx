import jwt_decode from "jwt-decode";
import User from "./user";
import { useLoginMutation } from "../../controller/user/userSlice";
import { type APIError, type APIResponse } from "./httpRequestInterfaces";
import { isInContainer } from "../../view/utils/utils";

// const API_URL = "http://0.0.0.0:80/api/v1/";

interface DecodedJWTToken {
    tokenType: string
    exp: string
    iat: string
    jti: string
    userId: string
    username: string
    email: string
    isAdmin: [boolean]
    profilePicture: [string]
    registrationDate: [number]
    lastLoginDate: number
}

export interface AuthInput {
    username: string
    password: string
}

export const authenticate = async (username: string, password: string): Promise<APIResponse | APIError> => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [login, { isLoading }] = useLoginMutation();

    return await login({ username, password }).unwrap();
}

class UserFactory {
    static fetchUser (): User | undefined {
        if (localStorage.getItem("user") === undefined || localStorage.getItem("user") === null) {
            return undefined
        } else {
            const userProfile = JSON.parse(localStorage.getItem("user") as string);
            return new User(
                userProfile.username,
                userProfile.email,
                userProfile.isAdmin,
                userProfile.registrationDate,
                userProfile.profilePicture,
                userProfile.lastLoginDate
            )
        }
    }

    /**
    * Decode the JSON Web token as a User
    * @param token JWT Token sent
    * @returns User authentified User
    */
    private static decodeJWTToken (token: string): User {
        const dataDecoded = jwt_decode<DecodedJWTToken>(token);
        console.log(dataDecoded);
        return new User(
            dataDecoded.username,
            dataDecoded.email,
            dataDecoded.isAdmin[0],
            dataDecoded.registrationDate[0],
            dataDecoded.profilePicture[0],
            dataDecoded.lastLoginDate
        );
    }

    /**
     * Set the value of the authenticated user to the local storage
     * @param token login token of the user
     */
    public static updateUser (token: string): void {
        let user: User;
        if (isInContainer()) {
            user = new User(
                "myUsername",
                "myEmail",
                false,
                new Date().valueOf() / 1000,
                "",
                new Date().valueOf() / 1000
            )
        } else {
            user = UserFactory.decodeJWTToken(token);
        }
        localStorage.setItem("user", JSON.stringify(user));
    }

    /**
     * Fetch the user from the local storage
     * @returns {User} current logged-in user
     */
    public static getUser (): User | undefined {
        const stringifiedUser: string | null = localStorage.getItem("user");
        if (stringifiedUser === null) {
            return undefined;
        }
        const user: User = new User();
        Object.assign(user, stringifiedUser);
        return user;
    }
}

export default UserFactory;
