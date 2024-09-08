import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ScrollToTop } from "./components/index.js";
import { FilterProvider } from "./context/FilterContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FilterProvider>
        <ScrollToTop />
        <App />
      </FilterProvider>
    </BrowserRouter>
  </StrictMode>
);
