import React from "react";
import TopBarMenuNotConnectedDialog from "./topBarNotConnectedMenuDialog";

interface TopBarMenuProps {
    anchorEl: HTMLElement | null
    handleClose: () => void
    openedMenu: boolean
    openDialog: () => void
    isConnected: boolean
    handleDialogOpen: () => void
    handleMenuClose: () => void
}

export default function TopBarMenu (props: TopBarMenuProps): JSX.Element {
    if (props.isConnected) {
        return (
            <TopBarMenuNotConnectedDialog
                anchorEl={props.anchorEl}
                handleClose={props.handleMenuClose}
                openedMenu={props.openedMenu}
                openDialog={props.handleDialogOpen}
            />
        );
    } else {
        return (
            <TopBarMenuNotConnectedDialog
                anchorEl={props.anchorEl}
                handleClose={props.handleMenuClose}
                openedMenu={props.openedMenu}
                openDialog={props.handleDialogOpen}
            />
        );
    }
}
