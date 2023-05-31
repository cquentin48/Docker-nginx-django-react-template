import { applyMiddleware, legacy_createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";

export const store = legacy_createStore(
  userReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);
