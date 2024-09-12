import React from "react";

import LoginDialog from "../../../../dialog/login/loginDialog";
import ConnectedAvatarButton from "./connectedAvatarButton";
import ProfileManagmentMenu from "./profileManagmentMenu";

interface ProfileManagmentMenuProps {
    anchorEl: HTMLElement | null
    openedMenu: boolean
    isConnected: boolean
    handleDialogOpen: () => void
    handleMenuClose: () => void
    handleDialogClosed: () => void
    openedDialog: boolean
    handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ProfileManagment (props: ProfileManagmentMenuProps): JSX.Element {
    if (props.isConnected) {
        return (
            <div>
                <ConnectedAvatarButton
                    handleMenuClick={props.handleMenuClick}
                    openedMenu={props.openedMenu}
                />
                <ProfileManagmentMenu
                    anchorEl={props.anchorEl}
                    handleClose={props.handleMenuClose}
                    openedMenu={props.openedMenu}
                    openDialog={props.handleDialogOpen}
                />
                <LoginDialog
                    handleClose={props.handleDialogClosed}
                    open={props.openedDialog}
                />
            </div>
        );
    } else {
        return (
            <div>
            </div>
        );
    }
}
