import React from "react";

import { Box, Card, Grid, Typography } from "@mui/material";

import type User from "../../../../model/user/user";
import APPAvatar from "../../widgets/appAvatar";
import MainInfosTable from "./mainInfosTable";
import { History } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';

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
            sx={{
                height: "100%"
            }}
        >
            <Card
                sx={{
                    padding: "16px 12px 16px",
                    height: "86.5vh",
                    width: "28vh",
                    position: "fixed"
                }}
            >
                <Box
                    display="inline-block"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    borderBottom={"1px solid black"}
                    paddingBottom="8px"
                    marginBottom="8px"
                >
                    <APPAvatar
                        altText="UP"
                        diameter={96}
                        profilePicturePath={user.getProfilePicture()}
                    />
                    <MainInfosTable user={user}/>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            marginBottom: "8px"
                        }}
                    >
                        <History/> History
                    </Typography>
                    <DataGrid
                        sx={{
                            maxHeight: "934vh"
                        }}
                        columns={[
                            { field: "id", headerName: "ID", width: 35 },
                            { field: "name", headerName: "Object name" }
                        ]}
                        rows={[{
                            id: 1, name: "object", date: "21/06/23"
                        }]}
                        checkboxSelection
                        hideFooter
                        onRowSelectionModelChange={(event) => {
                            event.forEach((singleID) => {
                                console.log(singleID);
                            })
                        }}
                    />
                </Box>
            </Card>
        </Grid>
    )
}
