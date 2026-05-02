import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "ledgerui";
import App from "./App";
import "ledgerui/styles.css";
import "./styles.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
