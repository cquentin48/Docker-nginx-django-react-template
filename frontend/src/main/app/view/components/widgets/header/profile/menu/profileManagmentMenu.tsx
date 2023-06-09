import React from "react";

import { Menu, MenuItem } from "@mui/material";
import { ExitToApp, ManageAccounts, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

import localizedStrings from "../../../../../../app/locale/locale";
import type User from "../../../../../../model/user/user";
import UserFactory from "../../../../../../model/user/userFactory";
import APPAvatar from "../../../appAvatar";

interface ProfileManagmentMenuProps {
    anchorEl: HTMLElement | null
    handleClose: () => void
    openedMenu: boolean
    openDialog: () => void
}

export default function ProfileManagmentMenu (
    props: ProfileManagmentMenuProps
): JSX.Element {
    const user = UserFactory.fetchUser() as User;
    return (
        <Menu
            id="login-menu-dialog"
            anchorEl={props.anchorEl}
            open={props.openedMenu}
            onClose={props.handleClose}
            MenuListProps={{
                "aria-labelledby": "menu-login-button"
            }}
            sx={{
                alignItems: "center",
                width: "100%"
            }}
        >
            <APPAvatar
                profilePicturePath={user.getProfilePicture()}
                altText={user.getUsername()}
                diameter={80}
            />
            <MenuItem
                onClick={props.handleClose}
                LinkComponent={Link}
                href="profile"
                component="a">
                <ManageAccounts/>{localizedStrings.CONNECTED_MENU_PROFILE_LABEL}
            </MenuItem>
            <MenuItem
                onClick={props.handleClose}
                LinkComponent={Link}
                href="/profile"
            >
                <Settings/>{localizedStrings.CONNECTED_MENU_SETTINGS_LABEL}
            </MenuItem>
            <MenuItem
                onClick={props.openDialog}
            >
                <ExitToApp/>{localizedStrings.CONNECTED_MENU_LOGOUT_LABEL}
            </MenuItem>
        </Menu>
    );
}
