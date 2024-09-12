import { BaseController } from "./baseController";

import { type APIResponse, type APIError } from "../../model/user/httpRequestInterfaces";
import { type VariantType } from "notistack";
import localizedStrings from "../../app/locale/locale";
import UserFactory from "../../model/user/userFactory";
import MessageNotification from "../../app/notification/notification";

export default class LoginAction extends BaseController {
    act (result: string): void {
        let message;
        let severity: VariantType;

        const parsedResult: APIResponse | APIError = JSON.parse(result)

        if ('detail' in parsedResult) {
            message = localizedStrings.FAILED_LOGIN
            severity = "error"
        } else {
            const data: APIResponse = parsedResult;
            UserFactory.updateUser(data.access);
            message = localizedStrings.SUCCESSFUL_LOGIN
            severity = "success"
        }
        const notification = new MessageNotification(message, severity);
        this.updateFunction(JSON.stringify(notification))
    }
}
