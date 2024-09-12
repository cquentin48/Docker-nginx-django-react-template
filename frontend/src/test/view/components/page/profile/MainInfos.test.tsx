import React from "react";

import renderer from "react-test-renderer";

import User from "../../../../../main/app/model/user/user"
import MainInfos from "../../../../../main/app/view/components/pages/profile/mainInfos";

it("Correct render", () => {
    // Given
    const user = new User()

    // Acts
    const operationResult = renderer.create(
        <MainInfos
            user={user}/>
    ).toJSON()

    // Expects
    expect(operationResult).toMatchSnapshot()
})
