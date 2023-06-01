import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";
import React from "react";

type ReactNode = JSX.Element;
type AlertColor = "success" | "info" | "warning" | "error";

interface SnackbarProps {
    message: string
    open: boolean
    action?: ReactNode
    severity: AlertColor
    handleClose: (event: React.SyntheticEvent | Event, reason: string) => void
}

class CustomAlertSnackbar extends React.Component<SnackbarProps, {}> {
    componentDidMount (): void {
        this.setState({
            open: true
        });
    }

    render (): React.ReactNode {
        const props = this.props;

        if (props.action !== undefined) {
            return (
                <Snackbar
                    open={props.open}
                    autoHideDuration={6000}
                    onClose={props.handleClose}
                    action={props.action}
                >
                    <Alert severity={props.severity}>{props.message}</Alert>
                </Snackbar>
            );
        } else {
            return (
                <Snackbar
                    open={props.open}
                    autoHideDuration={6000}
                    onClose={props.handleClose}
                    action={
                        <React.Fragment>
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={(event) => {
                                    props.handleClose(event, "close");
                                }}
                            >
                                <Close fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                >
                    <Alert severity={props.severity}>{props.message}</Alert>
                </Snackbar>
            );
        }
    }
}

export default CustomAlertSnackbar;
