import React from "react";

import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import LoginButtons from "./loginButtons";

interface DrawerProps {
    isUserConnected: boolean
    openedMenu: boolean
    anchorEl: HTMLElement | null
    handleDialogOpen: () => void
    handleMenuClose: () => void
    handleDialogClosed: () => void
    openedDialog: boolean
}

export function Drawer (props: DrawerProps): JSX.Element {
    if (props.isUserConnected) {
        return (
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <Menu />
            </IconButton>
        )
    } else {
        return (
            <LoginButtons
                anchorEl={props.anchorEl}
                openedMenu={props.openedMenu}
                handleDialogOpen={props.handleDialogOpen}
                handleMenuClose={props.handleDialogClosed}
                handleDialogClosed={props.handleDialogClosed}
                openedDialog={props.openedDialog}
            />
        )
    }
}
