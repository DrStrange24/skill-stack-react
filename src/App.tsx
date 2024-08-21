import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, ProtectedRoute } from "./components";
import { Home, About, Contact, Product, Signup, Login } from "./pages";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/product"
            element={<ProtectedRoute element={<Product />} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
