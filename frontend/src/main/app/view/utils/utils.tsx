/**
 * Check if the web application is not running inside a docker container
 * - `true` yes
 * - `false` no
 * @returns {boolean} whether the app is inside a docker container or not
 */
export function isNotInContainer (): boolean {
    return process.env.REACT_APP_IS_IN_DOCKER_COMPOSE_MODE !== "1";
}
