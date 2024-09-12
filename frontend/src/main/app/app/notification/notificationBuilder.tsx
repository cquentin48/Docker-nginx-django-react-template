import { type VariantType } from "notistack";
import App from "../../App";
import MessageNotification from "./notification";
import localizedStrings from "../locale/locale";

class NotificationBuilder {
    /**
     * Check if the web application can render notification or not
     * - `True` yes
     * - `False` no
     * @returns {boolean}
     */
    private static readonly canAppDisplayNotification = (): boolean =>
        App.isComponentReady()

    /**
     * Display a Notification for the application
     * @param message notification message
     * @param level level of display
     */
    static displayNotification (message: string, level: VariantType): void {
        if (NotificationBuilder.canAppDisplayNotification()) {
            const notification = new MessageNotification(message, level)
            App.displayNotification(notification);
        } else {
            throw Error(`${localizedStrings.WEB_APP_NOT_READY}`)
        }
    }
}

export default NotificationBuilder;
