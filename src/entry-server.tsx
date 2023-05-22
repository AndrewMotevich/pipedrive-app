import React from "react";
import ReactDOMServer from "react-dom/server";
// @ts-ignore
import App from "./App";
import { StaticRouter } from "react-router-dom/server";

export function render(url: string) {
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  return { html };
}
