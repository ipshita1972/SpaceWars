import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { GlobalContextProvider } from "./context";

createRoot(document.getElementById("root")).render(
  <ThirdwebProvider
    activeChain="ethereum"
    clientId="7014cdab9a4187b45fa0b016ece9c69a"
  >
    <StrictMode>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </StrictMode>
  </ThirdwebProvider>
);
