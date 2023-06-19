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
        description: 'Delete the account. Any store data is removed!',
        action: undefined
    },
    {
        id: 'deactivate-account',
        label: 'Deactivate',
        description: 'Deactive the account. A mail will be sent on next login.',
        action: undefined
    },
    {
        id: 'update-username',
        label: 'Update username',
        description: 'Set new user name.',
        action: undefined
    },
    {
        id: 'update-email',
        label: 'Update email',
        description: 'Set new user email.',
        action: undefined
    },
    {
        id: 'update-password',
        label: 'Update password',
        description: 'Set new user password.',
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
                    padding: "16px 0px 16px",
                    height: "86.5vh",
                    width: "154vh",
                    position: "fixed"
                }}
            >
                <CardHeader
                    title={localizedStrings.PROFILE_ACTIONS_HEADER}
                    sx={{
                        textAlign: "center"
                    }}
                />
                <Box
                    display="grid"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    left="0"
                    right="0"
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
