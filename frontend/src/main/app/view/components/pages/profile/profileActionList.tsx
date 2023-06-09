import React from "react";
import { Box, Card, CardHeader, Grid } from "@mui/material";
import ProfileActionAccordion from "./profileActionAccordion";
import { ManageAccounts } from "@mui/icons-material";
import localizedStrings from "../../../../app/locale/locale";
import type User from "../../../../model/user/user";

interface ProfileDateProps {
    user: User
}

const profileActionList = [
    {
        id: 'delete-account',
        label: 'Delete',
        description: 'Delete the account',
        action: undefined
    }
]

export default function ProfileActionList (props: ProfileDateProps): JSX.Element {
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
                        actionList={profileActionList}
                    />
                </Box>
            </Card>
        </Grid>
    )
}
