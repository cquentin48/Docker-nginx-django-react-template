import React from "react";
import TopBar from "./components/header/topBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../res/css/App.css";
import UserFactory from "./model/user/userFactory";

interface AppState {
  isConnected: boolean; // will be replaced later by redux or a token
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isConnected: false,
    };
  }

  render(): JSX.Element {
    const state = this.state;
    return (
      <div className="App">
        <TopBar
          isConnected={state.isConnected}
          handleLoginAction={UserFactory.authenticate}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<p>Bonjour!</p>} />
            <Route path="/test" element={<p>Element de test!</p>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
