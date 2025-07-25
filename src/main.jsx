import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Importing global styles
import "./styles/global.css";
// Importing variables for styling
import "./styles/variables.css";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <BrowserRouter>
         <AuthProvider>
            <App />
         </AuthProvider>
      </BrowserRouter>
   </StrictMode>
);
