import LocalizedStrings from "react-localization";

const localizedStrings = new LocalizedStrings({
    "en-US": {
        FAILED_LOGIN: "Login failed! Please check your username and password!",
        SUCCESSFUL_LOGIN: "Successful login!"
    },
    "fr-FR": {
        FAILED_LOGIN:
      "Échec dans l'authentification! Vérifiez votre pseudonyme et/ou votre mot de passe.",
        SUCCESSFUL_LOGIN: "Connexion réussie!"
    }
});

export default localizedStrings;
