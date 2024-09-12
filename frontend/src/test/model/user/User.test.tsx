import User from "../../../main/app/model/user/user"

test("User default constructor", () => {
    // Acts
    const operationResult = new User();

    // Expects
    expect(operationResult.getUsername()).toBe("");
    expect(operationResult.getEmail()).toBe("");
    expect(operationResult.getRegistrationDate()).toBe(0);
    expect(operationResult.getIsAdmin()).toBe(false);
    expect(operationResult.getProfilePicture()).toBe("");
    expect(operationResult.getLastLoginDate()).toBe(0);
})

test("User custom constructor", () => {
    // Given
    const username = "Myusername";
    const email = "Myemail";
    const isAdmin = false;
    const registrationDate = 3;
    const profilePicture = "/55"
    const lastLoginDate = 3;

    // Acts
    const operationResult = new User(
        username,
        email,
        isAdmin,
        registrationDate,
        profilePicture,
        lastLoginDate
    );

    // Expects
    expect(operationResult.getUsername()).toBe(username);
    expect(operationResult.getEmail()).toBe(email);
    expect(operationResult.getRegistrationDate()).toBe(registrationDate);
    expect(operationResult.getIsAdmin()).toBe(isAdmin);
    expect(operationResult.getProfilePicture()).toBe(profilePicture);
    expect(operationResult.getLastLoginDate()).toBe(lastLoginDate);
})
