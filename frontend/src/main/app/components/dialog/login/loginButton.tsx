import React from "react";
import { useLoginMutation } from "../../../store/user/userSlice";
import { type APIResponse } from "../../../model/user/httpRequestInterfaces";
import localizedStrings from "../../../model/locale/locale";
import { Button } from "@mui/material";
import { VpnKey } from "@mui/icons-material";
import { type VariantType } from "notistack";
import { ButtonDialogSX } from "../styles";
import UserFactory from "../../../model/user/userFactory";
import MessageNotification from "../../../model/message/message";

interface LoginButtonProps {
    username: string
    password: string
    displaySnackBar: (message: MessageNotification) => void
    handleClose: () => void
}

export const LoginButton = (props: LoginButtonProps): JSX.Element => {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const [login, { isLoading }] = useLoginMutation();

    const handleLoginButton = async (props: LoginButtonProps): Promise<void> => {
        const loginInput = { username: props.username, password: props.password }
        const result = await login(loginInput).unwrap()

        let message;
        let severity: VariantType;
        if ('detail' in result) {
            message = localizedStrings.FAILED_LOGIN
            severity = "error"
        } else {
            const data: APIResponse = result;
            UserFactory.updateUser(data.access);
            message = localizedStrings.SUCCESSFUL_LOGIN
            severity = "success"
        }

        const notification = new MessageNotification(message, severity)
        props.displaySnackBar(notification);

        if ('access' in result) {
            props.handleClose();
        }
    }
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
                handleLoginButton(props)
                    .then(() => {
                        props.handleClose();
                    })
                    .catch(error => {
                        if ('status' in error && error.status === "FETCH_ERROR") {
                            props.displaySnackBar(
                                new MessageNotification(
                                    <div style={{
                                        verticalAlign: "middle"
                                    }}>
                                        {localizedStrings.FETCH_ERROR}
                                    </div>,
                                    "error")
                            )
                        }
                    });
            }}
            startIcon={<VpnKey />}
        >
            {localizedStrings.LOGIN_LABEL}
        </Button>
    )
}
