import React from "react"

import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import type User from "../../../../model/user/user"

interface ProfileActionProps {
    id: string
    label: string
    description: string
    action?: (user: User) => void
}

export default function ProfileAction (props: ProfileActionProps): JSX.Element {
    return (
        <Card
            id={props.id}
            sx={{
                minWidth: 128,
                maxWidth: 256,
                height: 144
            }}
        >
            <CardHeader
                title={props.label}
            />
            <CardContent>
                <Typography>
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    )
}
