import React from "react";

import { testIgnoredInNoContainer } from "../../../utils"
import { LoginButton } from "../../../../main/app/view/components/dialog/login/loginButton"
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { store } from "../../../../main/app/controller/store";

afterEach(() => {
    localStorage.removeItem("user")
})

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
    const inputs = {
        username: "myUser",
        password: "password"
    }
    const handleCloseDialogFunction = (): void => {};

    jest.mock("../../../../main/app/controller/user/userSlice")

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
    button.click();

    // Asserts
    console.log(localStorage.getItem("user"))
    expect(localStorage.getItem("user")).not.toBe(null)
    expect(localStorage.getItem("user")).not.toBe(undefined)
});
