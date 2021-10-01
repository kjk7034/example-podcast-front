import { ApolloProvider } from "@apollo/client";
import React from "react";
import { render } from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { client } from "./apollo";
import App from "./App";
import "./styles/styles.css";

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);
