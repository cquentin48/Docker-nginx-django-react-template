import React from "react";

import { Button } from "@mui/material";
import { Login, Person } from "@mui/icons-material";
import localizedStrings from "../../../../../../app/locale/locale";

interface TopBarMenuNotConnectedDialogProps {
    anchorEl: HTMLElement | null
    handleClose: () => void
    openedMenu: boolean
    openDialog: () => void
}

export default function TopBarMenuNotConnectedButton (
    props: TopBarMenuNotConnectedDialogProps
): JSX.Element {
    return (
        <div>
            <Button
                color="inherit"
                onClick={props.openDialog}
                startIcon={<Login/>}
            >
                {localizedStrings.LOGIN_LABEL}
            </Button>
            <Button
                color="inherit"
                onClick={props.openDialog}
                startIcon={<Person/>}
            >
                {localizedStrings.REGISTER_LABEL}
            </Button>
        </div>
    )
}
