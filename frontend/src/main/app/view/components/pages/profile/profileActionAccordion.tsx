import React from "react";

import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import PopupState, { bindHover, bindPopover } from "material-ui-popup-state";
import HoverPoper from "material-ui-popup-state/HoverPopover";
import ProfileAction from "./profileAction";
import type User from "../../../../model/user/user";

interface SingleAction {
    id: string
    label: string
    description: string
    action?: (user: User) => void
}

interface ProfileActionAccordionProps {
    startIcon: React.ReactNode
    ListLabel: string
    ListHelper: string
    id: string
    user: User
    actionList: SingleAction[]
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
                {props.actionList.map((singleAction, _) => {
                    return (
                        <ProfileAction
                            key={singleAction.id}
                            description={singleAction.description}
                            id={singleAction.id}
                            label={singleAction.label}
                        />)
                })}
            </AccordionDetails>
        </Accordion>
    )
}
