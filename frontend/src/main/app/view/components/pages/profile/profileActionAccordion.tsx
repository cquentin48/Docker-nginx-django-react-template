import React from "react";

import { Avatar, Card, CardContent, CardHeader, Grid } from "@mui/material";
import ProfileAction from "./profileAction";
import type User from "../../../../model/user/user";
import { red } from "@mui/material/colors";

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
        <Grid
            container
            spacing={0}
        >
            <Grid
                item
                xs={12}
                style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    margin: 0
                }}
            >
                <Card
                    sx={{
                        display: "block",
                        margin: "16px 0px 0px",
                        height: "auto",
                        width: "77.5vw"
                    }}
                >
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {props.startIcon}
                            </Avatar>
                        }
                        title={props.ListLabel}
                        subheader={props.ListHelper}
                    />
                    <CardContent>
                        <Grid
                            container
                            spacing={2}
                            justifyContent="left"
                            marginLeft={2}
                            marginRight={2}
                        >
                            {props.actionList.map((singleAction, _) => {
                                return (
                                    <Grid
                                        item
                                        sm={12}
                                        md={6}
                                        lg={2.5}
                                        style={{
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                            margin: 0
                                        }}
                                        key={`grid-item-${singleAction.id}`}
                                    >
                                        <ProfileAction
                                            key={singleAction.id}
                                            description={singleAction.description}
                                            id={singleAction.id}
                                            label={singleAction.label}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

/*
export default function ProfileActionAccordion (props: ProfileActionAccordionProps): JSX.Element {
    return (
        <Accordion
        >
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls={`${props.id}-content`}
                id={`${props.id}-header`}
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
*/
