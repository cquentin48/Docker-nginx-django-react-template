import React from "react";
import type User from "../../../model/user/user";
import { Box, Card, CardHeader, Grid } from "@mui/material";
import localizedStrings from "../../../model/locale/locale";
import ProfileActionAccordion from "./profileActionAccordion";
import { ManageAccounts } from "@mui/icons-material";

interface ProfileDateProps {
    user: User
}

export default function ProfileActions (props: ProfileDateProps): JSX.Element {
    const user = props.user;
    return (
        <Grid
            item
            xs={10}
            sx={{
                height: "100%"
            }}
        >
            <Card
                sx={{
                    padding: "16px 0px 16px"
                }}
            >
                <CardHeader
                    title={localizedStrings.PROFILE_ACTIONS_HEADER}
                />
                <Box
                    display="inline-block"
                    justifyContent="center"
                    alignItems="center"
                >
                    <ProfileActionAccordion
                        id="userManagment"
                        ListLabel={localizedStrings.PROFILE_ACTIONS_ACCORDION_ACCOUNT_MANAGMENT_LABEL}
                        ListHelper={localizedStrings.PROFILE_ACTIONS_ACCORDION_ACCOUNT_MANAGMENT_HELPER}
                        startIcon={<ManageAccounts/>}
                        user={user}
                    />
                </Box>
            </Card>
        </Grid>
    )
}
