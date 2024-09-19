import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app";
import "./index.css";

import { Honeybadger, HoneybadgerErrorBoundary } from '@honeybadger-io/react'

const config = {
  apiKey: process.env.HONEYBADGER_API_KEY,
  assetsUrl: process.env.HONEYBADGER_ASSETS_URL,
  revision: process.env.HONEYBADGER_REVISION,
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
}
const honeybadger = Honeybadger.configure(config)

const mount = () => {
  const root = document.querySelector("#root");

  if (!root) {
    throw new Error(
      "Expected to find an element with the ID 'root' to mount app"
    );
  }

  ReactDOM.render(
    <React.StrictMode>
      <HoneybadgerErrorBoundary honeybadger={honeybadger}>
        <App />
      </HoneybadgerErrorBoundary>
    </React.StrictMode>,
    root
  );
};

const onLoad = (callback: () => void) => {
  window.addEventListener("load", callback, { once: true });
};

onLoad(mount);
