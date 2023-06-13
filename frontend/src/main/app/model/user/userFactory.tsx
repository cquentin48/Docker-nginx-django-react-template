import jwt_decode from "jwt-decode";
import User from "./user";
import { isNotInContainer } from "../../view/utils/utils";

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

class UserFactory {
    private static isUserDefined (): boolean {
        return !(localStorage.getItem("user") === null || localStorage.getItem("user") === undefined || localStorage.getItem("user") === "");
    }

    static fetchUser (): User | undefined {
        if (!UserFactory.isUserDefined()) {
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
        if (isNotInContainer()) {
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
        if (!(UserFactory.isUserDefined())) {
            return undefined;
        }
        const user: User = new User();
        Object.assign(user, stringifiedUser);
        return user;
    }
}

export default UserFactory;
