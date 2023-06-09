import React from "react";
import logo from "../res/gfx/logo.svg";
import "../res/css/App.css";
import Router from "./router/Router";

class App extends React.Component {
  render (): React.ReactNode {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" id="appLogo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Router/>
      </div>
    );
  }
}

export default App;
