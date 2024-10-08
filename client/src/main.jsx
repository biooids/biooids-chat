import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import ThemeProvider from "./components/mainComp/ThemeProvider.jsx";
import { store, persistor } from "./app/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
  // </StrictMode>
);
