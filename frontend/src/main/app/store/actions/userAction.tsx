import type User from "../../model/user/user";
import UserFactory from "../../model/user/userFactory";
import Locale from "../../model/locale/Locale";

interface UserActionResult {
  message:string,
  state?:{
    user: User;
  }
}

export const login = (username: string, password: string): UserActionResult => {
  UserFactory.authenticate(username, password)
    .then((response) => {
      if (response instanceof Error) {
        throw response;
      }
      return response;
    })
    .then((user: User) => {
      return ({
        message: Locale.getInstance().loadLocaleStringValue("SUCCESSFUL_LOGIN"),
        state: {
          user
        }
      });
    })
    .catch((_) => {
      return ({
        message: Locale.getInstance().loadLocaleStringValue("FAILED_LOGIN")
      });
    });
  throw Error("");
};
