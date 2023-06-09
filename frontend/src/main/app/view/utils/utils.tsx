/**
 * Check if the web application is running inside a docker container
 * - True yes
 * - False no
 * @returns {boolean} whether the app is inside a docker container or not
 */
export function isInContainer (): boolean {
    return process.env.IS_IN_DOCKER_COMPOSE_MODE as unknown as number !== 1;
}
