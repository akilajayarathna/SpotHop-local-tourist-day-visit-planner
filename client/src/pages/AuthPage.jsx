import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const inputClass = "w-full border border-gray-300 rounded-full py-3 pl-10 pr-10 text-sm bg-white";
const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none";

export default function AuthPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const url = `http://localhost:5000/api/auth/${isRegister ? "register" : "login"}`;

        axios
            .post(url, form)
            .then((response) => {
                login(response.data);
                const goTo = response.data.user.role === "admin" ? "/dashboard" : from;
                navigate(goTo, { replace: true });
            })
            .catch((err) => setError(err.response?.data?.message || "Something went wrong"));
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left panel */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-10 flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif">
                        {isRegister ? "Join SpotHop" : "Welcome Back to SpotHop"}
                    </h1>
                    <p className="mt-4 text-sm text-orange-100 max-w-md">
                        Sign in to access your saved Piliyandala itineraries, discover new local
                        eateries, and continue your adventure.
                    </p>
                </div>

                <div className="hidden md:block">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 rounded-lg p-3">
                            <Info className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Personalized Plans</p>
                            <p className="text-xs text-orange-100">
                                Access your custom "My Day Plan" from any device.
                            </p>
                        </div>
                    </div>
                    <p className="mt-8 text-xs italic text-orange-100">
                        "Piliyandala is best explored with a plan. SpotHop makes it easy."
                    </p>
                </div>
            </div>

            {/* Right panel */}
            <div className="bg-slate-50 flex items-center justify-center p-8">
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isRegister ? "Create Account" : "Tourist Login"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {isRegister
                            ? "Enter your details to start planning."
                            : "Enter your credentials to continue exploring."}
                    </p>

                    <div className="flex flex-col gap-5 mt-8">
                        {isRegister && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                                <div className="relative">
                                    <User className={iconClass} />
                                    <input name="name" value={form.name} onChange={handleChange}
                                        placeholder="Alex" required className={inputClass} />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className={iconClass} />
                                <input type="email" name="email" value={form.email} onChange={handleChange}
                                    placeholder="alex@example.com" required className={inputClass} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className={iconClass} />
                                <input type={showPassword ? "text" : "password"} name="password"
                                    value={form.password} onChange={handleChange}
                                    placeholder="At least 6 characters" minLength={6} required
                                    className={inputClass} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

                    <button type="submit"
                        className="w-full mt-8 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full py-3 text-sm transition">
                        {isRegister ? "Create Account" : "Sign In to Explore"}
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <hr className="my-8 border-gray-300" />

                    <p className="text-center text-xs text-gray-600">
                        {isRegister ? "Already have an account? " : "New to SpotHop? "}
                        <button type="button"
                            onClick={() => { setIsRegister(!isRegister); setError(""); }}
                            className="font-semibold text-orange-600">
                            {isRegister ? "Sign in" : "Create an account"}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}