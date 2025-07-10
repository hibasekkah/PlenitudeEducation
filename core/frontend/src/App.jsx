// Exemple dans App.jsx
import AuthProvider from "./provider/authProvider";
import AppRouter from "./router"; // Assurez-vous que le chemin est correct

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;