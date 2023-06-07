import React from "react";

import { Person, AlternateEmail, CalendarMonth } from "@mui/icons-material";
import { formatDate } from "../../../model/locale/locale";
import type User from "../../../model/user/user";

interface MainInfosTableProps {
    user: User
}

export default function MainInfosTable (props: MainInfosTableProps): JSX.Element {
    const user = props.user;
    return (
        <table style={{
            textAlign: "left",
            marginTop: "8px"
        }}>
            <tbody>
                <tr>
                    <td>
                        <Person/>
                    </td>
                    <td>
                        {user.getUsername()}
                    </td>
                </tr>
                <tr>
                    <td>
                        <AlternateEmail/>
                    </td>
                    <td>
                        {user.getEmail()}
                    </td>
                </tr>
                <tr>
                    <td>
                        <CalendarMonth/>
                    </td>
                    <td>
                        {formatDate(user.getRegistrationDate())}
                    </td>
                </tr>
                <tr>
                    <td>
                        <CalendarMonth/>
                    </td>
                    <td>
                        {formatDate(user.getLastLoginDate())}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
