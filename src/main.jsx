import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Importing global styles
import "./styles/global.css";
// Importing variables for styling
import "./styles/variables.css";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </StrictMode>
);
