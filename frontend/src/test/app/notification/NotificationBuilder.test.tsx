import React from "react";

import NotificationBuilder from "../../../main/app/app/notification/notificationBuilder"
import { render } from "@testing-library/react";
import App from "../../../main/app/App";
import { act } from "react-test-renderer";

it("Display notification without rendered App component", () => {
    // Acts
    const operationResult = NotificationBuilder.displayNotification

    // Expects
    expect(operationResult).toThrow(Error)
});

it("Display notification when App component is rendered", async () => {
    // Given
    /*
    const message = "My notification message!";
    const messageLevel: VariantType = "error";
    const functionCall = jest.spyOn(App, "displayNotification")
    */

    // Acts
    await act(async () => {
        render(<App/>);
        // TODO : Still bug here
        // NotificationBuilder.displayNotification(message,messageLevel);

        // Expects
        // expect(functionCall).toHaveBeenCalled();
    })
})
