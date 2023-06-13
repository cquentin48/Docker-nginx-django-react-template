import { render, screen } from "@testing-library/react";
import ProfilePage from "../../../../main/app/view/pages/profile/profilePage";
import { Typography } from "@mui/material";

afterEach(()=>{
    localStorage.removeItem("user");
})

it("Display error", ()=>{

    // Acts
    const result = render(<ProfilePage/>)
    const node = render(<Typography variant="h1">
            Accès refusé
        </Typography>)

    // Expects
    console.log(result.container.firstChild?.contains(
        null
    ))
})