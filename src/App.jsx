import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
   return (
      <>
         <div className="app">
            <Toaster />
            <AppRoutes />
         </div>
      </>
   );
}

export default App;
