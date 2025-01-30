import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useRequireAuthentication = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) navigate("/login");
};
