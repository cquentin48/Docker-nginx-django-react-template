import React from "react";

import {
  AppBar,
  Button,
  Box,
  Toolbar,
  IconButton,
  Avatar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import TopBarMenuDialog from "./topBarMenuDialog";
import LoginDialog from "./loginDialog";

interface TopBarState {
  i: number;
  anchorEl: HTMLElement | null;
  openedMenu: boolean;
  openedDialog: boolean;
}
interface TopBarProps {
  isConnected: boolean;
  handleLoginAction: (username: string, password: string) => void;
}

/* eslint-disable */

class TopBar extends React.Component<TopBarProps, TopBarState> {
  constructor(props: TopBarProps) {
    super(props);
    this.state = {
      i: 0,
      anchorEl: null,
      openedMenu: false,
      openedDialog: false,
    };
    this.setAnchorEl = this.setAnchorEl.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClosed = this.handleDialogClosed.bind(this);
  }

  setAnchorEl(value: HTMLElement | null) {
    this.setState({
      anchorEl: value,
      openedMenu: !this.state.openedMenu,
    });
  }

  handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setAnchorEl(event.currentTarget);
  };

  handleMenuClose() {
    this.setAnchorEl(null);
  }

  handleDialogOpen() {
    this.setState({
      openedMenu: false,
      openedDialog: true,
    });
  }

  handleDialogClosed() {
    console.log("Fermeture!");
    this.setState({
      openedDialog: false,
    });
  }

  render(): React.ReactNode {
    const state = this.state;
    const props = this.props;
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Button
                id="menu-login-button"
                aria-controls={
                  state.openedMenu ? "login-menu-dialog" : undefined
                }
                aria-haspopup="true"
                aria-expanded={state.openedMenu ? "true" : undefined}
                onClick={this.handleMenuClick}
                sx={{
                  justifyContent: "flex-end",
                  marginRight: "6 px",
                }}
              >
                <Avatar alt="Login">
                  <PersonIcon />
                </Avatar>
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <TopBarMenuDialog
          anchorEl={state.anchorEl}
          handleClose={this.handleMenuClose}
          openedMenu={state.openedMenu}
          openDialog={this.handleDialogOpen}
        />
        <LoginDialog
          handleClose={this.handleDialogClosed}
          open={state.openedDialog}
          handleLoginAction={props.handleLoginAction}
        />
      </div>
    );
  }
}

export default TopBar;
