import React from "react";

import renderer from "react-test-renderer";

import User from "../../../../../main/app/model/user/user"
import ProfileActionList from "../../../../../main/app/view/components/pages/profile/profileActionList";

it("Correct render", () => {
    // Given
    const user = new User()

    // Acts
    const operationResult = renderer.create(
        <ProfileActionList
            user={user}/>
    ).toJSON()

    // Expects
    expect(operationResult).toMatchSnapshot()
})
