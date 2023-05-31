import { LOGIN_FAILED, LOGIN_SUCCESS } from "../returnsType/userReturnsType";
import type FunctionReturnType from "./interface";
import { type UserReducerActionInterface } from "./interface";

const initialState: UserReducerActionInterface = {};

export default function (
  state: UserReducerActionInterface = initialState,
  action: UserReducerActionInterface
): FunctionReturnType {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("User", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
        message: {
          text: "Successful loading!",
          severity: "success",
        },
      };
    case LOGIN_FAILED:
      localStorage.setItem("User", "");
      return {
        ...state,
        message: {
          text: "Loading error!",
          severity: "error",
        },
      };
    default:
      return {
        state,
      };
  }
}
