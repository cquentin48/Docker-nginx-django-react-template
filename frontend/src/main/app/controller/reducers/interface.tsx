/* istanbul ignore file */

import { type VariantType } from "notistack";
import type User from "../../model/user/user";

export interface UserReducerActionInterface {
    type?: string
    payload?: User
}

export default interface FunctionReturnType {
    state?: UserReducerActionInterface
    user?: User
    message?: {
        text: string
        severity: VariantType
    }
}
