import localizedStrings, { formatDate, setLanguage } from "../../../main/app/app/locale/locale"

test("formatDate", () => {
    // Given
    const date = new Date(2016, 11, 17).getTime();
    const expectedResult = "12/17/2016";

    // Acts
    const unitTestResult = formatDate(date);

    // Expects
    expect(unitTestResult).toBe(expectedResult);
})

test("Change locale language", () => {
    // Given
    const newLanguage = "fr-FR"
    const expectedResult = "Changer de mot de passe"

    // Acts
    setLanguage(newLanguage)

    // Expects
    expect(localizedStrings.CHANGE_PASSWORD).toBe(expectedResult)
})
