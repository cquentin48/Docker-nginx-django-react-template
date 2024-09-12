import React from "react";

import renderer from "react-test-renderer";
import Unauthorized from "../../../../main/app/view/pages/error/unauthorized";

test("Is login button correctly rendered", () => {
    // Acts
    const tree: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = renderer.create(
        <Unauthorized/>
    ).toJSON();

    // Asserts
    expect(tree).toMatchSnapshot()
})
