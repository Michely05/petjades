import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../assets/icons/logout.svg";

export const DashboardHeader = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="h-16 bg-[--primary-color] w-full flex items-center justify-between px-6 text-white">
            <h2 className="font-title font-bold sm:text-3xl md:text-4xl lg:text-[2.5rem] text-(--primary-color)">Panell de control</h2>

            <button
                onClick={handleLogout}
                className="p-2"
                title="Sortir">
                <img 
                    src={logoutIcon} 
                    alt="Sortir" 
                    className="w-8 cursor-pointer" 
                />
            </button>
        </header>
    )
}