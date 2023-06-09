import { Typography } from "@mui/material";
import React from "react"

export default function Unauthorized (): JSX.Element {
    return (
        <div>
            <Typography variant="h1">
                Accès refusé
            </Typography>
            Une authentification est nécessaire pour se connecter!
        </div>
    );
}
