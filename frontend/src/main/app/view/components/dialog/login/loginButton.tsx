import React from "react";
import { Button } from "@mui/material";
import { VpnKey } from "@mui/icons-material";
import { ButtonDialogSX } from "../styles";

import localizedStrings from "../../../../app/locale/locale";
import { useLoginMutation } from "../../../../controller/user/userSlice";
import UserFactory from "../../../../model/user/userFactory";
import { isNotInContainer } from "../../../utils/utils";
import NotificationBuilder from "../../../../app/notification/notificationBuilder";
import LoginAction from "../../../../controller/actions/loginAction";
import type MessageNotification from "../../../../app/notification/notification";

interface LoginButtonProps {
    username: string
    password: string
    handleClose: () => void
}

export const LoginButton = (props: LoginButtonProps): JSX.Element => {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const [login, { isLoading }] = useLoginMutation();

    const updateAction = (result: string): void => {
        const message = JSON.parse(result) as MessageNotification
        NotificationBuilder.displayNotification(message.getMessage() as string, message.getSeverity())
    }

    const handleLoginButton = async (props: LoginButtonProps): Promise<void> => {
        const loginInput = { username: props.username, password: props.password }
        const result = await login(loginInput).unwrap()
        const action = new LoginAction(updateAction);
        action.act(JSON.stringify(result));

        /* istanbul ignore next */
        if ('access' in result) {
            props.handleClose();
        }
    }

    /* istanbul ignore next */
    return (
        <Button
            variant="contained"
            sx={ButtonDialogSX}
            key="login-dialog-signIn"
            style={{
                minHeight: "40px",
                maxHeight: "40px"
            }}
            onClick={() => {
                if (isNotInContainer()) {
                    UserFactory.updateUser("");
                    props.handleClose();
                } else {
                    handleLoginButton(props)
                        .then(() => {
                            props.handleClose();
                        })
                        .catch(error => {
                            if ('status' in error && error.status === "FETCH_ERROR") {
                                NotificationBuilder.displayNotification(localizedStrings.FETCH_ERROR, "error")
                            }
                        });
                }
            }}
            startIcon={<VpnKey />}
        >
            {localizedStrings.LOGIN_LABEL}
        </Button>
    )
}
