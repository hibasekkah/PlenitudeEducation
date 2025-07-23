import AuthProvider from "./provider/authProvider";
import AppRouter from "./router"; 
import { Toaster } from 'sonner';


function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
}

export default App;