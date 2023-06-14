import React from "react";

import renderer from "react-test-renderer";
import APPAvatar from "../../../../main/app/view/components/widgets/appAvatar";

it("AppAvatar with no profile picture path", () => {
    // Given
    const altText = "U";

    // Acts
    const result: renderer.ReactTestRendererJSON =
    renderer.create(
        <APPAvatar altText={altText}
            profilePicturePath={""}
            diameter={96}/>
    ).toJSON() as renderer.ReactTestRendererJSON;

    // Expects
    expect(result.children?.length).toBe(1);
    expect(result.props.src).toBeUndefined();
});
