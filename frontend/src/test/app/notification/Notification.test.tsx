import { type VariantType } from "notistack"
import MessageNotification from "../../../main/app/app/notification/notification"

test("Default notification constructor", () => {
    // Given
    const message = "My message!"
    const exepectedResult: VariantType = "default"

    // Acts
    const testObject = new MessageNotification(message)

    // Asserts
    expect(testObject.getMessage()).toBe(message);
    expect(testObject.getSeverity()).toBe(exepectedResult)
})
