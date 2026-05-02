import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@nategiraudeau/ledgerui";
import App from "./App";
import "@nategiraudeau/ledgerui/styles.css";
import "./styles.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
