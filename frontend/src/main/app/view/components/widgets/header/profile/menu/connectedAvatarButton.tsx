import React from "react";

import { Person } from "@mui/icons-material";
import { Button, Avatar } from "@mui/material";

interface ConnectedAvatarButtonProps {
    openedMenu: boolean
    handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void
};

export default function ConnectedAvatarButton (props: ConnectedAvatarButtonProps): JSX.Element {
    return (
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
    );
}
