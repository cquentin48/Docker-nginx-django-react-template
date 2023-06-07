import LocalizedStrings from "react-localization";

const localizedStrings = new LocalizedStrings({
    "en-US": {
        CHANGE_PASSWORD: "Change password",
        DATE: "{1}/{0}/{2}",
        EMAIL_LABEL: "Email",
        FAILED_LOGIN: "Login failed! Please check your username and password!",
        FETCH_ERROR: "API indisponible!",
        LAST_LOGIN: "Last login",
        LOGIN_DIALOG_HEADER: "Hello!",
        LOGIN_LABEL: "Login",
        LOST_IDENTIFIERS_LABEL: "Identifiers lost?",
        LOST_PASSWORDS_TEXT: "You have lost your identifiers? Click here",
        PROFILE_ACTIONS_HEADER: "Profile Actions",
        PROFILE_ACTIONS_ACCORDION_ACCOUNT_MANAGMENT_HELPER: "Here you can update profile attributes " +
        "while also delete it.",
        PROFILE_ACTIONS_ACCORDION_ACCOUNT_MANAGMENT_LABEL: "Account managment",
        REGISTER_LABEL: "Register",
        REGISTERED_SINCE: "Registered since",
        RESET_INPUT_LABEL: "Reset inputs",
        SUCCESSFUL_LOGIN: "Successful login!",
        USERNAME_LABEL: "Username"
    },
    "fr-FR": {
        CHANGE_PASSWORD: "Changer de mot de passe",
        DATE: "{0}/{1}/{2}",
        EMAIL_LABEL: "Email",
        FAILED_LOGIN:
      "Échec dans l'authentification! Vérifiez votre pseudonyme et/ou votre mot de passe.",
        FETCH_ERROR: "API unavailable!",
        LAST_LOGIN: "Dernière connexion",
        LOGIN_DIALOG_HEADER: "Bonjour!",
        LOGIN_LABEL: "Se connecter",
        LOST_IDENTIFIERS_LABEL: "Identifiants perdus?",
        LOST_PASSWORDS_TEXT: "Vous avez perdus vos identifiants? Cliquez ici!",
        PROFILE_ACTIONS_HEADER: "Actions possibles",
        PROFILE_ACTIONS_ACCORDION_ACCOUNT_MANAGMENT_HELPER: "Ici se trouve les modifications des " +
        "attributs du profile ainsi que sa suppression.",
        PROFILE_ACTIONS_ACCORDION_ACCOUNT_MANAGMENT_LABEL: "Gestion du profil",
        REGISTERED_SINCE: "Inscrit le",
        REGISTER_LABEL: "Créer un compte",
        RESET_INPUT_LABEL: "Réinitialiser",
        SUCCESSFUL_LOGIN: "Connexion réussie!",
        USERNAME_LABEL: "Pseudonyme"
    }
});

localizedStrings.setLanguage(navigator.language);

export const setLanguage = (newLanguage: string): void => {
    localizedStrings.setLanguage(newLanguage)
}

export const formatDate = (timestampDate: number): string => {
    const date = new Date(timestampDate * 1000);
    return localizedStrings.formatString(
        localizedStrings.DATE,
        (`0${date.getDate()}`).slice(-2),
        (`0${date.getMonth()}`).slice(-2),
        date.getFullYear().toString()
    ) as string
}

export default localizedStrings;
