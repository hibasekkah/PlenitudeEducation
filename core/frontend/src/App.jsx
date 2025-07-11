import AuthProvider from "./provider/authProvider";
import AppRouter from "./router"; 

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;