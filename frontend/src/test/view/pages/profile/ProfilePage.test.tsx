import React from "react";

import renderer from "react-test-renderer";
import ProfilePage from "../../../../main/app/view/pages/profile/profilePage";

afterEach(() => {
    localStorage.removeItem("user");
})

it("Display error", () => {
    // Acts
    const operationResult = renderer.create(
        <ProfilePage/>
    ).toJSON()

    // Expects
    const id = (operationResult as renderer.ReactTestRendererJSON).props.id
    expect(id).toBe('unauthorized')
})
