import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Toast } from "./components";
import {
  Home,
  About,
  Contact,
  Product,
  Signup,
  Login,
  Profile,
  EmailConfirmation,
  Users,
} from "./pages";
import { AuthProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<Product />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/confirm-email" element={<EmailConfirmation />} />
          <Route path="/users" element={<Users />} />
        </Routes>
        <Toast />
      </BrowserRouter>
    </AuthProvider>
  );
};
