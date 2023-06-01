import { type VariantType } from "notistack";

class MessageNotification {
    private readonly message;
    private readonly severity;

    constructor (message: string = "", severity: VariantType = "default") {
        this.message = message;
        this.severity = severity;
    }

    getMessage (): string {
        return this.message;
    }

    getSeverity (): VariantType {
        return this.severity;
    }
}

export default MessageNotification;
