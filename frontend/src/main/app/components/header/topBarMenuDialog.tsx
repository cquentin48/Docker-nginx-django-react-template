import React from "react";

import { Menu, MenuItem } from "@mui/material";

interface TopBarMenuDialogProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  openedMenu: boolean;
  openDialog: () => void;
}

export default function TopBarMenuDialog(
  props: TopBarMenuDialogProps
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
      <MenuItem onClick={props.openDialog}>Login</MenuItem>
      <MenuItem onClick={props.openDialog}>Password Lost?</MenuItem>
      <MenuItem onClick={props.openDialog}>Username Lost?</MenuItem>
    </Menu>
  );
}
