import User from "../../../main/app/model/user/user";
import UserFactory from "../../../main/app/model/user/userFactory";
import { isNotInContainer } from "../../../main/app/view/utils/utils";

const items = {
    defaultContainerMode: isNotInContainer()
}; ;

afterEach(() => {
    localStorage.removeItem("user");
    if (items.defaultContainerMode) {
        process.env.IS_IN_DOCKER_COMPOSE_MODE = undefined;
    } else {
        process.env.IS_IN_DOCKER_COMPOSE_MODE = "1";
    }
    process.env.REACT_APP_IS_IN_DOCKER_COMPOSE_MODE = undefined
})

test("getUser with undefined value in localStorage", () => {
    // Given
    const user = "";

    // Acts
    localStorage.setItem("user", user);
    const operationResult = UserFactory.getUser();

    // Asserts
    expect(operationResult).toBe(undefined)
});

test("updateUserInContainer", () => {
    // Before
    process.env.REACT_APP_IS_IN_DOCKER_COMPOSE_MODE = "1"

    // Given
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJ" +
    "IUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiw" +
    "iZXhwIjoxNjg1OTU2OTQyLCJpYXQiOjE2ODU5NTMz" +
    "NDIsImp0aSI6IjgyMGZhZDY3OTBhZTQwNTQ5YTdhM" +
    "TFjZDUzNzQ4ZDdkIiwidXNlcl9pZCI6MSwidXNlcm" +
    "5hbWUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VyQHVzZXI" +
    "uY29tIiwiaXNBZG1pbiI6W2ZhbHNlXSwicHJvZmls" +
    "ZVBpY3R1cmUiOlsiIl0sInJlZ2lzdHJhdGlvbkRhd" +
    "GUiOlsxXSwibGFzdExvZ2luRGF0ZSI6MX0.IYlN1p" +
    "sIoqCfVMKm_ffckqCmX9SV1PWPeyhIjOBwXMQ"

    const expectedResult = new User(
        "user",
        "user@user.com",
        false,
        1,
        "",
        1
    )

    // Acts
    UserFactory.updateUser(token)
    const operationResult = UserFactory.fetchUser()

    // Asserts
    expect(operationResult?.getEmail()).toBe(expectedResult.getEmail())
    expect(operationResult?.getIsAdmin()).toBe(expectedResult.getIsAdmin())
    expect(operationResult?.getLastLoginDate()).toBe(expectedResult.getLastLoginDate())
    expect(operationResult?.getProfilePicture()).toBe(expectedResult.getProfilePicture())
    expect(operationResult?.getRegistrationDate()).toBe(expectedResult.getRegistrationDate())
    expect(operationResult?.getUsername()).toBe(expectedResult.getUsername())
});

test("updateUserNotInContainer", () => {
    // Before
    process.env.IS_IN_DOCKER_COMPOSE_MODE = undefined

    // Given
    const token = "";
    const expectedResult = new User(
        "myUsername",
        "myEmail",
        false,
        new Date().valueOf() / 1000,
        "",
        new Date().valueOf() / 1000
    );

    // Acts
    UserFactory.updateUser(token)
    const operationResult = UserFactory.fetchUser()

    // Asserts
    expect(operationResult?.getEmail()).toBe(expectedResult.getEmail())
    expect(operationResult?.getIsAdmin()).toBe(expectedResult.getIsAdmin())
    expect(operationResult?.getLastLoginDate()).toBe(expectedResult.getLastLoginDate())
    expect(operationResult?.getProfilePicture()).toBe(expectedResult.getProfilePicture())
    expect(operationResult?.getRegistrationDate()).toBe(expectedResult.getRegistrationDate())
    expect(operationResult?.getUsername()).toBe(expectedResult.getUsername())
});

test("fetchUser method with user set in local storage", () => {
    // Given
    const expectedResult = new User(
        "myUsername",
        "myEmail",
        false,
        new Date().valueOf() / 1000,
        "",
        new Date().valueOf() / 1000
    );
    localStorage.setItem("user", JSON.stringify(expectedResult))

    // Acts
    const operationResult = UserFactory.fetchUser()

    // Asserts
    expect(operationResult?.getEmail()).toBe(expectedResult.getEmail())
    expect(operationResult?.getIsAdmin()).toBe(expectedResult.getIsAdmin())
    expect(operationResult?.getLastLoginDate()).toBe(expectedResult.getLastLoginDate())
    expect(operationResult?.getProfilePicture()).toBe(expectedResult.getProfilePicture())
    expect(operationResult?.getRegistrationDate()).toBe(expectedResult.getRegistrationDate())
    expect(operationResult?.getUsername()).toBe(expectedResult.getUsername())
});

test("getUser method with user set in local storage", () => {
    // Given
    const expectedResult = new User(
        "",
        "",
        false,
        0,
        "",
        0
    );
    localStorage.setItem("user", JSON.stringify(expectedResult))

    // Acts
    const operationResult = UserFactory.getUser()

    // Asserts
    expect(operationResult?.getEmail()).toBe(expectedResult.getEmail())
    expect(operationResult?.getIsAdmin()).toBe(expectedResult.getIsAdmin())
    expect(operationResult?.getLastLoginDate()).toBe(expectedResult.getLastLoginDate())
    expect(operationResult?.getProfilePicture()).toBe(expectedResult.getProfilePicture())
    expect(operationResult?.getRegistrationDate()).toBe(expectedResult.getRegistrationDate())
    expect(operationResult?.getUsername()).toBe(expectedResult.getUsername())
});

test("getUser method with user not set in local storage", () => {
    // Given
    const expectedResult = undefined

    // Acts
    const operationResult = UserFactory.getUser()

    // Asserts
    expect(operationResult).toBe(expectedResult)
});
