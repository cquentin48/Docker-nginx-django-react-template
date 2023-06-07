import React from "react";
import TopBar from "./components/header/topBar";
import "../res/css/App.css";
import UserFactory from "./model/user/userFactory";
import { Provider } from "react-redux";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import WebAPPRouter from "./pages/router";
import { store } from "./store/store";
import type MessageNotification from "./model/message/message";

class App extends React.Component<{}> {
    constructor (props: {}) {
        super(props);

        this.displayNotification = this.displayNotification.bind(this);
    }

    /**
     * Display a notification
     * @param message written message
     * @param severity severity
     */
    displayNotification (message: MessageNotification): void {
        enqueueSnackbar(message.getMessage(),
            {
                variant: message.getSeverity()
            }
        );
    }

    render (): JSX.Element {
        return (
            <div className="App">
                <Provider store={store}>
                    <SnackbarProvider maxSnack={4}>
                        <div>
                            <TopBar
                                isConnected={UserFactory.fetchUser() !== undefined}
                                displayNotificationFunction={this.displayNotification}
                            />
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <WebAPPRouter />
                        </div>
                    </SnackbarProvider>
                </Provider>
            </div>
        );
    }
}

export default App;
