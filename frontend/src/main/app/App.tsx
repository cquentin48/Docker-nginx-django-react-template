import React from "react";

import "../res/css/App.css";

import UserFactory from "./model/user/userFactory";
import { Provider } from "react-redux";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { store } from "./controller/store";
import type MessageNotification from "./app/notification/notification";
import { BrowserRouter } from "react-router-dom";
import TopBar from "./view/components/header/topBar";
import WebAPPRouter from "./view/pages/router";

interface AppState {
    isMounted: boolean
}

class App extends React.Component<{}, AppState> {
    constructor (props: {}) {
        super(props);

        this.state = {
            isMounted: false
        }

        this.bindMethods();
    }

    /**
     * Bind the methods for later usages e.g. for notification display
     */
    bindMethods (): void {
        this._displayNotification = this._displayNotification.bind(this);
        this._isAppComponentReady = this._isAppComponentReady.bind(this);

        App.isComponentReady = this._isAppComponentReady.bind(this);
        App.displayNotification = this._displayNotification.bind(this);
    }

    componentDidMount (): void {
        this.setState({
            isMounted: true
        })
    }

    static isComponentReady = (): boolean => false;
    static displayNotification = (message: MessageNotification): void => {};

    /**
     * Check if the application is ready for later usage
     * @returns {boolean} whether the web app base component is ready or not
     */
    _isAppComponentReady = (): boolean => {
        return this.state.isMounted;
    }

    /**
     * Display a notification
     * @param message written message
     * @param severity severity
     */
    _displayNotification (message: MessageNotification): void {
        /* istanbul ignore next */
        enqueueSnackbar(message.getMessage(),
            {
                variant: message.getSeverity()
            }
        );
    }

    render (): JSX.Element {
        return (
            <div className="App" style={{
                height: "100%",
                overflow: "hidden"
            }}>
                <Provider store={store}>
                    <SnackbarProvider maxSnack={4}>
                        <BrowserRouter>
                            <div>
                                <TopBar
                                    isConnected={UserFactory.fetchUser() !== undefined}
                                />
                            </div>
                            <div style={{
                                marginTop: 80,
                                marginBottom: 50,
                                height: "100%"
                            }}>
                                <WebAPPRouter />
                            </div>
                        </BrowserRouter>
                    </SnackbarProvider>
                </Provider>
            </div>
        );
    }
}

export default App;
