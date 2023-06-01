class User {
    private readonly username;
    private readonly email;
    private readonly registrationDate;
    private readonly isAdmin;
    private readonly profilePicture;
    private readonly lastLogin;

    constructor (
        username: string = "",
        email: string = "",
        admin: boolean = false,
        registrationDate: number = 0,
        profilePicture: string = "",
        lastLogin: number = 0
    ) {
        this.username = username;
        this.email = email;
        this.isAdmin = admin;
        this.registrationDate = registrationDate;
        this.lastLogin = lastLogin;
        this.profilePicture = profilePicture;
    }

    getUsername (): string {
        return this.username;
    }

    getEmail (): string {
        return this.email;
    }

    getIsAdmin (): boolean {
        return this.isAdmin;
    }

    getRegistrationDate (): number {
        return this.registrationDate;
    }

    getLastLogin (): number {
        return this.lastLogin;
    }

    getProfilePicture (): string {
        return this.profilePicture;
    }
}
export default User;
