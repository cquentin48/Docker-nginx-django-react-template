import React from "react";
import TopBarMenuNotConnectedButton from "../topBarNotConnectedMenuDialog";
import TopBarMenuConnectedDialog from "./topBarConnectedMenuDialog";
import { Button, Avatar } from "@mui/material";
import { Person } from "@mui/icons-material";

import type MessageNotification from "../../../../model/message/message";
import LoginDialog from "../../../dialog/login/loginDialog";

interface ProfileManagmentMenuProps {
    anchorEl: HTMLElement | null
    handleClose: () => void
    openedMenu: boolean
    openDialog: () => void
    isConnected: boolean
    handleDialogOpen: () => void
    handleMenuClose: () => void
    handleDialogClosed: () => void
    openedDialog: boolean
    displayNotificationFunction: (message: MessageNotification) => void
    handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ProfileManagmentMenu (props: ProfileManagmentMenuProps): JSX.Element {
    if (props.isConnected) {
        return (
            <div>
                <Button
                    id="menu-login-button"
                    aria-controls={
                        props.openedMenu ? "login-menu-dialog" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={props.openedMenu ? "true" : undefined}
                    onClick={props.handleMenuClick}
                    sx={{
                        justifyContent: "flex-end",
                        marginRight: "6 px"
                    }}
                >
                    <Avatar alt="Login">
                        <Person />
                    </Avatar>
                </Button>
                <TopBarMenuConnectedDialog
                    anchorEl={props.anchorEl}
                    handleClose={props.handleMenuClose}
                    openedMenu={props.openedMenu}
                    openDialog={props.handleDialogOpen}
                />
                <LoginDialog
                    handleClose={props.handleDialogClosed}
                    open={props.openedDialog}
                    displayNotificationFunction={props.displayNotificationFunction}
                />
            </div>
        );
    } else {
        return (
            <div>
                <TopBarMenuNotConnectedButton
                    anchorEl={props.anchorEl}
                    handleClose={props.handleMenuClose}
                    openedMenu={props.openedMenu}
                    openDialog={props.handleDialogOpen}
                />
                <LoginDialog
                    handleClose={props.handleDialogClosed}
                    open={props.openedDialog}
                    displayNotificationFunction={props.displayNotificationFunction}
                />
            </div>
        );
    }
}
