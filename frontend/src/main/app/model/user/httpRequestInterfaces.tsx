/* istanbul ignore file */

export interface APIResponse {
    refresh: string
    access: string
}

export interface APIError {
    detail: string
}

export interface LoginInput {
    username: string
    password: string
}
