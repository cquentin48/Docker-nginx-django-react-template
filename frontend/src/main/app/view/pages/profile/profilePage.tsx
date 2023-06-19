import React from "react";
import Unauthorized from "../error/unauthorized";
import { Container, Grid } from "@mui/material";
import ProfileMainInfos from "../../components/pages/profile/mainInfos";
import ProfileActionList from "../../components/pages/profile/profileActionList";
import type User from "../../../model/user/user";
import UserFactory from "../../../model/user/userFactory";

interface ProfilePageState {
    user?: User
    selectedIDs: number[]
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface ProfilePageProps {

};

class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {
    constructor (props: ProfilePageProps) {
        super(props);
        this.state = {
            user: UserFactory.fetchUser() as User,
            selectedIDs: []
        }
    }

    render (): React.ReactNode {
        const user: User | undefined = this.state.user;
        if (user === undefined || user === null) {
            return (<Unauthorized/>)
        } else {
            return (
                <Container
                    maxWidth={false}
                    style={{
                        height: "100%",
                        overflow: "hidden"
                    }}>
                    <Grid
                        container
                        spacing={10}
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        style={{
                            height: "100%"
                        }}
                    >
                        <ProfileMainInfos user={user}/>
                        <ProfileActionList
                            user={user}
                        />
                    </Grid>
                </Container>
            )
        }
    }
}

export default ProfilePage;
