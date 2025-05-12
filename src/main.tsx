import "./index.css";
import "@ant-design/v5-patch-for-react-19";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router";

import i18n from "./i18n/config";
import App from "./App.tsx";
import { AppProvider } from "./AppProvider.tsx";

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
