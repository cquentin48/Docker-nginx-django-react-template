import React from "react";
import TopBar from "./components/header/topBar";
import "../res/css/App.css";
import UserFactory from "./model/user/userFactory";
import type User from "./model/user/user";
import { Provider } from "react-redux";
import { SnackbarProvider, type VariantType } from "notistack";
import WebAPPRouter from "./pages/router";
import { store } from "./store/store";
import localizedStrings from "./model/locale/locale";
import { useLoginMutation } from "./store/user/userSlice";

class App extends React.Component<{}> {
    constructor (props: {}) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.displayNotification = this.displayNotification.bind(this);
    }

    handleLogin = (username: string, password:string): void => {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const [login, { isLoading }] = useLoginMutation();

        login({ username, password }).unwrap().then(result => {
            const className = result.constructor.name;

            if (className !== "APIError") {
                throw Error(localizedStrings.formatString("LOGIN_FAILED") as string);
            }

            const message: string = localizedStrings.formatString("LOGIN_SUCCESS") as string;
            const severity: VariantType = "success";
            this.displayNotification(message, severity);
        }).catch((exception: Error) => {
            this.displayNotification(exception.message, "error")
        });
    }

    /**
     * Display a notification
     * @param message written message
     * @param severity severity
     */
    displayNotification (message: string, severity: VariantType): void {
        console.log(`Type ${message}; severity ${severity}`);
        // enqueueSnackbar(message,{ action: severity});
    }

    render (): JSX.Element {
        const user = UserFactory.fetchUser();
        return (
            <div className="App">
                <Provider store={store}>
                    <SnackbarProvider maxSnack={4}>
                        <TopBar
                            isConnected={user !== undefined}
                            handleLoginAction={UserFactory.authenticate}
                            handleUpdateAction={this.updateUser}
                            displayNotificationFunction={this.displayNotification}
                        />
                        <WebAPPRouter />
                    </SnackbarProvider>
                </Provider>
            </div>
        );
    }
}

export default App;
