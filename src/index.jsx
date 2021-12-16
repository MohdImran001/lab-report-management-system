import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./pages/App";
import "bootstrap/dist/css/bootstrap.min.css";

Sentry.init({
  dsn: "https://af1a89bbe84e41e796e1413d093f451b@o1091192.ingest.sentry.io/6107900",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById("root"));
