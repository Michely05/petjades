import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "@emotion/react/jsx-runtime";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();

    console.log("Auth state:", isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/" />;
};
