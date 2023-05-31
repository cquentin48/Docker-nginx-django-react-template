import React from "react";
import TopBar from "./components/header/topBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../res/css/App.css";
import UserFactory from "./model/user/userFactory";
import type User from "./model/user/user";
import { useSelector } from "react-redux";
import { SnackbarProvider, type VariantType, enqueueSnackbar } from "notistack";
import type FunctionReturnType from "./store/reducers/interface";
import WebAPPRouter from "./pages/router";

interface AppState {
  user?: User;
  message?: {
    text: string;
    severity: VariantType;
  };
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      user:undefined,
      message: {
        text: "",
        severity: "default"
      }
    };

    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount(): void {
    const user = useSelector((state:FunctionReturnType)=>
      state.user
    )
    const message = useSelector((state:FunctionReturnType)=>
      state.message
    )
    this.setState({
      user,
      message
    })
  }

  componentDidUpdate(prevProps: Readonly<AppState>): void {
    const currentState = this.state;
    if(prevProps.message !== currentState.message &&
        this.state.message?.text !== "" && currentState.message?.severity !== "default"){
      enqueueSnackbar(currentState.message?.text, {
        action:currentState.message?.severity,
      })
      this.setState({
        message:{
          text:"",
          severity:"default"
        }
      })
    }
  }

  /**
   * Set the user in the frontend
   * @param user Authentified user
   */
  updateUser(user: User): void {
    this.setState({
      user,
    });
  }

  render(): JSX.Element {
    const state = this.state;
    return (
      <div className="App">
        <SnackbarProvider maxSnack={4}>
          <TopBar
            isConnected={state.user !== undefined}
            handleLoginAction={UserFactory.authenticate}
            handleUpdateAction={this.updateUser}
          />
        <WebAPPRouter/>
        </SnackbarProvider>
      </div>
    );
  }
}

export default App;
