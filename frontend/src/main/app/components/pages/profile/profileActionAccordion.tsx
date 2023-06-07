import React from "react";

import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import type User from "../../../model/user/user";
import PopupState, { bindHover, bindPopover } from "material-ui-popup-state";
import HoverPoper from "material-ui-popup-state/HoverPopover";

interface ProfileActionAccordionProps {
    startIcon: React.ReactNode
    ListLabel: string
    ListHelper: string
    id: string
    user: User
}

export default function ProfileActionAccordion (props: ProfileActionAccordionProps): JSX.Element {
    return (
        <Accordion
            sx={{
                width: "100%",
                flexGrow: "revert"
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls={`${props.id}-content`}
                id={`${props.id}-header`}
                sx={{
                    flexGrow: "inherit"
                }}
            >
                <Typography>
                    {props.startIcon} {props.ListLabel}
                </Typography>
                <PopupState
                    variant="popover"
                    popupId={`${props.id}-popup-popover`}>
                    {(popupState) => {
                        <div>
                            <Button {...bindHover(popupState)}>
                                Open popover
                            </Button>
                            <HoverPoper
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center"
                                }}
                            >
                                <Typography>
                                    {props.ListHelper}
                                </Typography>
                            </HoverPoper>
                        </div>
                    }}
                </PopupState>
            </AccordionSummary>
            <AccordionDetails>
                <p>List here the content</p>
            </AccordionDetails>
        </Accordion>
    )
}
