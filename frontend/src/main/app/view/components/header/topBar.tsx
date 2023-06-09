import React from "react";

import {
    AppBar,
    Box,
    Toolbar
} from "@mui/material";

import ProfileManagment from "../widgets/header/profile/menu/profileManagment";
import { Drawer } from "../widgets/header/profile/drawer/drawer";

interface TopBarState {
    anchorEl: HTMLElement | null
    openedMenu: boolean
    openedDialog: boolean
}
interface TopBarProps {
    isConnected: boolean
}

class TopBar extends React.Component<TopBarProps, TopBarState> {
    constructor (props: TopBarProps) {
        super(props);
        this.state = {
            anchorEl: null,
            openedMenu: false,
            openedDialog: false
        };
        this.setAnchorEl = this.setAnchorEl.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClosed = this.handleDialogClosed.bind(this);
    }

    setAnchorEl (value: HTMLElement | null): void {
        this.setState({
            anchorEl: value,
            openedMenu: !this.state.openedMenu
        });
    }

    handleMenuClick (event: React.MouseEvent<HTMLButtonElement>): void {
        this.setAnchorEl(event.currentTarget);
    };

    handleMenuClose (): void {
        this.setAnchorEl(null);
    }

    handleDialogOpen (): void {
        this.setState({
            openedMenu: false,
            openedDialog: true
        });
    }

    handleDialogClosed (): void {
        this.setState({
            openedDialog: false
        });
    }

    // Placer à gauche les boutons
    render (): React.ReactNode {
        const state = this.state;
        const props = this.props;

        return (
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar sx={{ justifyContent: "space-between" }}>
                            <Drawer
                                isUserConnected={props.isConnected}
                                openedMenu={state.openedMenu}
                                anchorEl={state.anchorEl}
                                handleDialogOpen={this.handleDialogOpen}
                                handleMenuClose={this.handleMenuClose}
                                handleDialogClosed={this.handleDialogClosed}
                                openedDialog={state.openedDialog}/>
                            <ProfileManagment
                                anchorEl={state.anchorEl}
                                openedMenu={state.openedMenu}
                                isConnected={props.isConnected}
                                handleDialogOpen={this.handleDialogOpen}
                                handleMenuClose={this.handleMenuClose}
                                handleDialogClosed={this.handleDialogClosed}
                                openedDialog={state.openedDialog}
                                handleMenuClick={this.handleMenuClick}
                            />
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        );
    }
}

export default TopBar;
