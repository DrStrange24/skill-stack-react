import { useNavigate } from "react-router-dom";
import { useAuth, useCheckAdminRole } from "../context/AuthContext";

export const useRequireAuthentication = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) navigate("/login");
};

export const useRequireAdminAuthentication = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) navigate("/login");
  const isAdmin = useCheckAdminRole();
  if (!isAdmin) navigate("/unauthorized");
};
