import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
            <Link to="/" className="text-xl font-bold font-serif text-orange-600">SpotHop</Link>

            <div className="flex items-center gap-5 text-sm font-semibold text-gray-700">
                {user?.role === "admin" && <Link to="/dashboard">Dashboard</Link>}
                {user && <Link to="/my-day">My Day</Link>}

                {user ? (
                    <>
                        <span className="font-normal text-gray-500">Hi, {user.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}