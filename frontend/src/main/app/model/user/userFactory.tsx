import axios from "axios";
import jwt_decode from "jwt-decode";
import User from "./user";
import { LOGIN_SUCCESS } from "../../store/returnsType/userReturnsType";

const API_URL = "http://0.0.0.0:80/api/v1/";

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
    static fetchUser (): User {
        if (localStorage.getItem("user") === "null") {
            throw Error("No user set");
        } else {
            const userProfile = localStorage.getItem("user") as string;
            return JSON.parse(userProfile) as User;
        }
    }

    static async authenticate (username: string, password: string): Promise<any> {
        axios
            .post(
                API_URL + "user/auth",
                { username, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    const token = response.data.access;
                    const userValue = UserFactory.decodeJWTToken(token);

                    localStorage.setItem("user", JSON.stringify(userValue));

                    return LOGIN_SUCCESS;
                } else {
                    throw Error(response.data.detail);
                }
            })
            .catch((error) => {
                return new Error(error);
            });
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
}

export default UserFactory;
