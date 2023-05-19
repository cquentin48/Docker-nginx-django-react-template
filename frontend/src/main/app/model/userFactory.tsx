import axios from "axios";
import jwt_decode from "jwt-decode";
import User from "./user";

const API_URL = "http://localhost:8000/api/v1/";

class UserFactory {
  static async authenticate(username: string, password: string): Promise<any> {
    axios
      .post(API_URL + "user/auth", {
        params: {
          username,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.access;
          return this.decodeJWTToken(token);
        } else {
          throw new Error("Error!"); // Replace here with the differents exceptions
        }
      }).catch(error=>{console.log(error)});
  }

  private static decodeJWTToken(token: string): User {
    const dataDecoded = jwt_decode(token);
    console.log(dataDecoded);
    return new User();
  }
}

export default UserFactory;