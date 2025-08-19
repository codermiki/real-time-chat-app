import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";

// Importing global styles
import "./styles/global.css";
// Importing variables for styling
import "./styles/variables.css";

createRoot(document.getElementById("root")).render(
   <AuthProvider>
      <ChatProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </ChatProvider>
   </AuthProvider>
);
