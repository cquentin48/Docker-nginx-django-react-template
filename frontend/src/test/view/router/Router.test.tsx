import React from "react";

import renderer from "react-test-renderer";

import Router from "../../../main/app/router/Router";

it("Correct render", () => {
    // Acts
    const operationResult = renderer.create(
        <Router/>
    ).toJSON()

    // Expects
    expect(operationResult).toMatchSnapshot()
})
