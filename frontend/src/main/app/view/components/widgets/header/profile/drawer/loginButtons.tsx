import React from "react";

import LoginDialog from "../../../../dialog/login/loginDialog";
import TopBarMenuNotConnectedButton from "./topBarNotConnectedMenuDialog";

interface LoginButtonsProps {
    anchorEl: HTMLElement | null
    openedMenu: boolean
    handleDialogOpen: () => void
    handleMenuClose: () => void
    handleDialogClosed: () => void
    openedDialog: boolean
}

export default function LoginButtons (props: LoginButtonsProps): JSX.Element {
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
            />
        </div>
    )
}
