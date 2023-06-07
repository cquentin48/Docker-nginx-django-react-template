import React from "react";

import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface DrawerProps {
    isUserConnected: boolean
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
        return (<div></div>)
    }
}
