import logo from "./logo.svg";
import "./App.css";
import TradeCard from "./components/Card";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";
import Order from "./pages/Order/Order";
import LoginForm from "./pages/Auth/Login";
import RegisterForm from "./pages/Auth/Register";
import { Outlet } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import { AuthProvider, useAuth } from "./contexts/Auth";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});
function App() {
  const { isLoggedIn, user } = useAuth();
  const isAdmin = user?.isAdmin;
  return (
    <div className="App">
      <ChakraProvider>
        {/* // <Order /> */}
        {/* <LoginForm /> */}
        {/* <RegisterForm /> */}
        {isLoggedIn && isAdmin ? (
          <Admin />
        ) : isLoggedIn && !isAdmin ? (
          <Order />
        ) : (
          <Outlet />
        )}
      </ChakraProvider>
    </div>
  );
}

export default App;
