import React from "react";

import renderer from "react-test-renderer";
import { Drawer } from "../../../../../../../main/app/view/components/widgets/header/profile/drawer/drawer";

it("Correct render", () => {
    // Given
    const connectedUser = true;
    const setAnchorEl = null;
    const openedMenu = true;
    const handleMenuClose: () => void = () => {

    };
    const handleDialogClosed: () => void = () => {

    };
    const handleDialogOpen: () => void = () => {

    };
    const openedDialog: boolean = false;

    // Acts
    const operationResult = renderer.create(
        <Drawer
            isUserConnected={connectedUser}
            openedMenu={openedMenu}
            anchorEl={setAnchorEl}
            handleDialogClosed={handleDialogClosed}
            handleMenuClose={handleMenuClose}
            handleDialogOpen={handleDialogOpen}
            openedDialog={openedDialog}
        />
    ).toJSON()

    // Expects
    expect(operationResult).toMatchSnapshot()
})
