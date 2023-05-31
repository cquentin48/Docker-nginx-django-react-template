import { Close } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";
import React from "react";

type ReactNode = JSX.Element;

interface SnackbarProps {
  message: string;
  open: boolean;
  action?: ReactNode;
}

interface SnackbarState {
  open: boolean;
}

class CustomSnackbar extends React.Component<SnackbarProps, SnackbarState> {
  constructor(props: SnackbarProps) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Handle the close event button of the snackbar
   * @param event Snackbar close event
   * @param reason Click event reason
   */
  handleClose(event: React.SyntheticEvent | Event, reason?: string): void {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: false,
    });
  }

  render(): React.ReactNode {
    const props = this.props;
    const state = this.state;

    if (props.action !== undefined) {
      return (
        <Snackbar
          open={state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={props.message}
          action={props.action}
        />
      );
    } else {
      return (
        <Snackbar
          open={props.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={props.message}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <Close fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      );
    }
  }
}

export default CustomSnackbar;
