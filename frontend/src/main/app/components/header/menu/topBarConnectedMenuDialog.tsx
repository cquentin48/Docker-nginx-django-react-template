import { Menu, MenuItem } from "@mui/material";
import React from "react";

interface TopBarMenuConnectedDialogProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  openedMenu: boolean;
  openDialog: () => void;
}

export default function TopBarMenuConnectedDialog(
  props: TopBarMenuConnectedDialogProps
): JSX.Element {
  return (
    <Menu
      id="login-menu-dialog"
      anchorEl={props.anchorEl}
      open={props.openedMenu}
      onClose={props.handleClose}
      MenuListProps={{
        "aria-labelledby": "menu-login-button",
      }}
    >
      <MenuItem onClick={props.openDialog}>My Profile</MenuItem>
      <MenuItem onClick={props.openDialog}>Signout</MenuItem>
    </Menu>
  );
}
