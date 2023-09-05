import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { HelmetProvider } from "react-helmet-async";

const getLibrary = (provider) => {
  //console.log("[getLibrary] provider", provider);
  return new Web3Provider(provider);
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Web3ReactProvider>
);
