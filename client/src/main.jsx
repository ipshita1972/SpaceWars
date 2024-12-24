import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { GlobalContextProvider } from "./context";

createRoot(document.getElementById("root")).render(
  <ThirdwebProvider
    activeChain="ethereum"
    clientId="e1954fee1a5c0280bf2de1fa26d2bdc2">
    <StrictMode>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </StrictMode>
  </ThirdwebProvider>
);
