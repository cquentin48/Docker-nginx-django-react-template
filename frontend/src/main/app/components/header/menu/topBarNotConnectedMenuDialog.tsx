import React from "react";

import { Menu, MenuItem, Typography } from "@mui/material";

interface TopBarMenuNotConnectedDialogProps {
    anchorEl: HTMLElement | null
    handleClose: () => void
    openedMenu: boolean
    openDialog: () => void
}

export default function TopBarMenuNotConnectedDialog (
    props: TopBarMenuNotConnectedDialogProps
): JSX.Element {
    return (
        <Menu
            id="login-menu-dialog"
            anchorEl={props.anchorEl}
            open={props.openedMenu}
            onClose={props.handleClose}
            MenuListProps={{
                "aria-labelledby": "menu-login-button"
            }}
        >
            <Typography>Hello!</Typography>
            <MenuItem onClick={props.openDialog}>Login</MenuItem>
            <MenuItem onClick={props.openDialog}>Identifiers Lost?</MenuItem>
            <MenuItem onClick={props.openDialog}>Register</MenuItem>
        </Menu>
    );
}
