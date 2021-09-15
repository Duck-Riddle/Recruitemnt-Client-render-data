import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Normalize } from "styled-normalize";

import App from "./App";
import { store } from "./app/store";
import GlobalStyle from "./globalStyle";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Normalize />
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
