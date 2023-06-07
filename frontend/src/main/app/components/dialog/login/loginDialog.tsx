import React from "react";

import {
    Button,
    Container,
    Dialog,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";

import { CleaningServices } from "@mui/icons-material";
import { LoginButton } from "./loginButton";
import { ButtonDialogSX, TextFieldDialogSX } from "../styles";
import localizedStrings from "../../../model/locale/locale";
import type MessageNotification from "../../../model/message/message";

type AlertColor = "success" | "info" | "warning" | "error";

interface LoginDialogProps {
    open: boolean
    handleClose: () => void
    displayNotificationFunction: (message: MessageNotification) => void
}

interface LoginDialogState {
    username: string
    password: string
    snackbarMessage: string
    snackbarOpened: boolean
    snackbarSeverity: AlertColor
}

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
                        <LoginButton
                            username={state.username}
                            password={state.password}
                            displaySnackBar={props.displayNotificationFunction}
                            handleClose={props.handleClose}
                        />
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
                            {localizedStrings.RESET_INPUT_LABEL}
                        </Button>
                        <DialogContentText>
                            {localizedStrings.LOST_PASSWORDS_TEXT}
                        </DialogContentText>
                    </Container>
                </Dialog>
            </div>
        );
    }
}

export default LoginDialog;
