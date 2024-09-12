import { isNotInContainer } from "../main/app/view/utils/utils"

/**
 * Triggers a jest unit test when the test is runned
 * from a docker container with the rest of the docker-compose suite
 * set
 * @param name name of the unit test
 * @param unitTestFunction unit test function runned
 */
export const testIgnoredInNoContainer = (name: string, unitTestFunction: () => void): void => {
    if (isNotInContainer()) {
        console.warn(`The unit test "${name}" can only be runned inside a docker-compose suite!`)
        test.skip(name, unitTestFunction);
    } else {
        test(name, unitTestFunction);
    }
}
