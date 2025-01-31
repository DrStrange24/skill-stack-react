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
} from "./pages";
import { AuthProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<Product />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/confirm-email" element={<EmailConfirmation />} />
        </Routes>
        <Toast />
      </BrowserRouter>
    </AuthProvider>
  );
};
