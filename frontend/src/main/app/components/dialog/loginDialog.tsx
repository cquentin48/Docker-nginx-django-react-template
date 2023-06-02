import React from "react";

import {
    Button,
    Container,
    Dialog,
    DialogTitle,
    TextField
} from "@mui/material";

import { CleaningServices, VpnKey } from "@mui/icons-material";
import type User from "../../model/user/user";
import CustomAlertSnackbar from "../widgets/snackBarAlert";
import { useLoginMutation } from "../../store/user/userSlice";
import { type VariantType } from "notistack";
import localizedStrings from "../../model/locale/locale";

type AlertColor = "success" | "info" | "warning" | "error";

interface LoginDialogProps {
    open: boolean
    handleClose: () => void
    handleLoginAction: (username: string, password: string) => Promise<any>
    handleUpdateAction: (user: User) => void
    displayNotificationFunction: (message: string, severity: VariantType) => void
}

interface LoginDialogState {
    username: string
    password: string
    snackbarMessage: string
    snackbarOpened: boolean
    snackbarSeverity: AlertColor
}

const TextFieldDialogSX = {
    margin: "16px 24px 16px"
};

const ButtonDialogSX = {
    width: "48.1%",
    margin: "16px 8px 16px"
};

class LoginDialog extends React.Component<LoginDialogProps, LoginDialogState> {
    constructor (props: LoginDialogProps) {
        super(props);
        this.state = {
            username: "username",
            password: "password",
            snackbarMessage: "",
            snackbarOpened: false,
            snackbarSeverity: "info"
        };

        this.resetInputValues = this.resetInputValues.bind(this);
        this.updatePasswordInput = this.updatePasswordInput.bind(this);
        this.updateUsernameInput = this.updateUsernameInput.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    resetInputValues (): void {
        this.setState({
            username: "username",
            password: "password"
        });
    }

    /**
   * Update the username into the class state
   * @param usernameUpdateEvent username value change event
   */
    updateUsernameInput (
        usernameUpdateEvent: React.ChangeEvent<HTMLInputElement>
    ): void {
        this.setState({
            username: usernameUpdateEvent.target.value
        });
    }

    /**
   * Check if the password and the username
   * have been set
   */
    areTheInputsSet (): boolean {
        const state = this.state;
        return state.username !== "" && state.password !== "";
    }

    /**
   * Update the password into the class state
   * @param passwordChangeEvent password value change event
   */
    updatePasswordInput (
        passwordChangeEvent: React.ChangeEvent<HTMLInputElement>
    ): void {
        this.setState({
            password: passwordChangeEvent.target.value
        });
    }

    displaySnackBar (snackbarMessage: string): void {
        this.setState({
            snackbarMessage
        });
    }

    handleCloseSnackbar (_: React.SyntheticEvent | Event, reason?: string): void {
        if (reason === "clickaway") {
            return;
        }
        this.setState({
            snackbarOpened: false
        });
    }

    handleLogin = (displayNotificationFunction:((message: string, severity: VariantType) => void)): void => {
        const { username, password } = this.state;

        /* eslint-disable @typescript-eslint/no-unused-vars */
        const [login, { isLoading }] = useLoginMutation();

        login({ username, password }).unwrap().then(result => {
            const className = result.constructor.name;

            if (className !== "APIError") {
                throw Error(localizedStrings.formatString("LOGIN_FAILED") as string);
            }

            const message: string = localizedStrings.formatString("LOGIN_SUCCESS") as string;
            const severity: VariantType = "success"
            displayNotificationFunction(message, severity)
        }).catch((exception: Error) => {
            displayNotificationFunction(exception.message, "error")
        });
    }

    render (): JSX.Element {
        const props = this.props;
        const state = this.state;

        return (
            <div>
                <Dialog
                    onClose={props.handleClose}
                    open={props.open}
                    fullWidth
                    maxWidth="md"
                >
                    <DialogTitle
                        sx={{
                            textAlign: "center"
                        }}
                    >
            Connexion
                    </DialogTitle>
                    <TextField
                        label="Login"
                        defaultValue="Login"
                        sx={{
                            margin: "16px 24px 16px"
                        }}
                        onChange={this.updateUsernameInput}
                    />
                    <TextField
                        label="Password"
                        defaultValue="Password"
                        type="password"
                        sx={TextFieldDialogSX}
                        onChange={this.updatePasswordInput}
                    />
                    <Container maxWidth={false}>
                        <Button
                            variant="outlined"
                            sx={ButtonDialogSX}
                            key="login-dialog-signIn"
                            style={{
                                minHeight: "40px",
                                maxHeight: "40px"
                            }}
                            onClick={() => {
                                this.handleLogin(props.displayNotificationFunction);
                                /*
                                let message: string;
                                let severity: VariantType;
                                if (result.isSuccess) {
                                    message = localizedStrings.formatString("LOGIN_SUCCESS") as string;
                                    severity = "success"
                                } else {
                                    message = localizedStrings.formatString("LOGIN_FAILED") as string;
                                    severity = "error"
                                }

                                props.displayNotificationFunction(message, severity)
                                */
                            }}
                            startIcon={<VpnKey />}
                        >
                            Login
                        </Button>
                        <Button
                            variant="outlined"
                            sx={ButtonDialogSX}
                            key="login-dialog-reset"
                            style={{
                                minHeight: "40px",
                                maxHeight: "40px"
                            }}
                            onClick={() => {
                                this.resetInputValues();
                            }}
                            startIcon={<CleaningServices />}
                        >
              Resets Inputs
                        </Button>
                    </Container>
                </Dialog>
                <CustomAlertSnackbar
                    message={state.snackbarMessage}
                    open={state.snackbarOpened}
                    handleClose={this.handleCloseSnackbar}
                    severity={state.snackbarSeverity}
                />
            </div>
        );
    }
}

export default LoginDialog;
