import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@ant-design/v5-patch-for-react-19";
import { BrowserRouter } from "react-router";
import { AppProvider } from "./AppProvider.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <I18nextProvider i18n={i18n} defaultNS={"translation"}>
          <App />
        </I18nextProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
);
