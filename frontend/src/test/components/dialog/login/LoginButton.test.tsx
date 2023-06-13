import React from "react"

import { testIgnoredInNoContainer } from "../../../utils"
import { LoginButton } from "../../../../main/app/view/components/dialog/login/loginButton"
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { store } from "../../../../main/app/controller/store";
import axios from "axios";

test("Is login button correctly rendered", () => {
    // Given
    const inputs = {
        username: "myUser",
        password: "password"
    }
    const handleCloseDialogFunction = (): void => {};

    // Acts
    const tree = renderer.create(
        <Provider store={store}>
            <LoginButton
                handleClose={handleCloseDialogFunction}
                username={inputs.username}
                password={inputs.password}
            />
        </Provider>
    ).toJSON();

    // Asserts
    expect(tree).toMatchSnapshot();
});

testIgnoredInNoContainer("Login button with correct inputs", () => {
    // Before
    axios.post("http://0.0.0.0/api/v1/user/register", {
        username: "user",
        password: "password",
        email: "mail@mail.com",
        first_name: "F.",
        last_name: "L."
    }).then(result => {
        // Given
        const inputs = {
            username: "myUser",
            password: "password"
        }
        const handleCloseDialogFunction = (): void => {};

        // Acts
        render(
            <Provider store={store}>
                <LoginButton
                    handleClose={handleCloseDialogFunction}
                    password={inputs.password}
                    username={inputs.username}
                />
            </Provider>
        )
        const button = screen.getByRole('button')
        fireEvent.click(button)

        // Asserts
        expect(localStorage.getItem("user")).not.toBe(null)
        expect(localStorage.getItem("user")).not.toBe(undefined)
    }).catch(_ => {
        fail("The login button should update the user!")
    })
})
