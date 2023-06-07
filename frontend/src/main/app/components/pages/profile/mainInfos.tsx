import React from "react";

import { Box, Card, Grid } from "@mui/material";

import type User from "../../../model/user/user";
import APPAvatar from "../../widgets/appAvatar";
import MainInfosTable from "./mainInfosTable";

interface ProfileMainInfosProps {
    user: User
}

export default function ProfileMainInfos (props: ProfileMainInfosProps): JSX.Element {
    const user = props.user;
    return (
        <Grid
            item
            xs={2}
            alignItems="center"
        >
            <Card
                sx={{
                    padding: "16px 0px 16px"
                }}
            >
                <Box
                    display="inline-block"
                    justifyContent="center"
                    alignItems="center"
                >
                    <APPAvatar
                        altText="UP"
                        diameter={96}
                        profilePicturePath={user.getProfilePicture()}
                    />
                    <MainInfosTable user={user}/>
                </Box>
            </Card>
        </Grid>
    )
}
