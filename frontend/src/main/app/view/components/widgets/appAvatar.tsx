import { Person } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

interface AvatarProps {
    altText: string
    profilePicturePath: string
    diameter: number
}

export default function APPAvatar (props: AvatarProps): JSX.Element {
    if (props.profilePicturePath !== "") {
        return <Avatar
            src={props.profilePicturePath}
            alt={props.altText}
            sx={{
                width: props.diameter,
                height: props.diameter,
                justifyContent: "center",
                display: "flex"
            }}
        />
    } else {
        return <Avatar
            alt={props.altText}
            sx={{
                width: props.diameter,
                height: props.diameter
            }}
        >
            <Person/>
        </Avatar>
    }
};
