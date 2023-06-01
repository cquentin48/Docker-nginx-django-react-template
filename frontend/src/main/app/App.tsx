import React from "react";
import TopBar from "./components/header/topBar";
import "../res/css/App.css";
import UserFactory from "./model/user/userFactory";
import type User from "./model/user/user";
import { Provider } from "react-redux";
import { SnackbarProvider, type VariantType } from "notistack";
import WebAPPRouter from "./pages/router";
import { store } from "./store/store";

class App extends React.Component<{}> {
    constructor (props: {}) {
        super(props);

        // this.initStoreSubscribe();

        this.updateUser = this.updateUser.bind(this);
        this.displayNotification = this.displayNotification.bind(this);
    }

    /*
    initStoreSubscribe (): void {
        store.subscribe(() => {
            const state = store.getState().user;
            if (state.message !== undefined) {
                // enqueueSnackbar(state.message.getMessage(),{action:state.message.getSeverity()})
                console.log("Succès!");
            }
        });
    }
    */

    /**
     * Display a notification
     * @param message written message
     * @param severity severity
     */
    displayNotification (message: string, severity: VariantType): void {
        console.log(`Type ${message}; severity ${severity}`);
        // enqueueSnackbar(message,{ action: severity});
    }

    /**
   * Set the user in the frontend
   * @param user Authentified user
   */
    updateUser (user: User): void {
        /*
        this.setState({
            user
        }); */
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
