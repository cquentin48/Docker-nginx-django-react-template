import React from "react";

import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  TextField,
} from "@mui/material";

import { CleaningServices, VpnKey } from "@mui/icons-material";

interface LoginDialogProps {
  open: boolean;
  handleClose: () => void;
  handleLoginAction: (username: string, password: string) => void;
}

interface LoginDialogState {
  username: string;
  password: string;
}

const TextFieldDialogSX = {
  margin: "16px 24px 16px",
};

const ButtonDialogSX = {
  width: "48.1%",
  margin: "16px 8px 16px",
};

class LoginDialog extends React.Component<LoginDialogProps, LoginDialogState> {
  constructor(props: LoginDialogProps) {
    super(props);
    this.state = {
      username: "username",
      password: "password",
    };

    this.resetInputValues = this.resetInputValues.bind(this);
    this.updatePasswordInput = this.updatePasswordInput.bind(this);
    this.updateUsernameInput = this.updateUsernameInput.bind(this);
  }

  resetInputValues(): void {
    this.setState({
      username: "username",
      password: "password",
    });
  }

  updateUsernameInput(
    usernameUpdateEvent: React.ChangeEvent<HTMLInputElement>
  ): void {
    console.log("Update");
    this.setState({
      password: usernameUpdateEvent.target.value,
    });
  }

  updatePasswordInput(
    passwordChangeEvent: React.ChangeEvent<HTMLInputElement>
  ): void {
    this.setState({
      password: passwordChangeEvent.target.value,
    });
  }

  render(): JSX.Element {
    const props = this.props;
    const state = this.state;
    return (
      <Dialog
        onClose={props.handleClose}
        open={props.open}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            textAlign: "center",
          }}
        >
          Connexion
        </DialogTitle>
        <TextField
          label="Login"
          defaultValue="Login"
          sx={{
            margin: "16px 24px 16px",
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
              maxHeight: "40px",
            }}
            onClick={() => {
              props.handleLoginAction(state.username, state.password);
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
              maxHeight: "40px",
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
    );
  }
}

export default LoginDialog;