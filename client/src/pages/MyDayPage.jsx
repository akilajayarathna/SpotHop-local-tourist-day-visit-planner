import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Trash2, Plus } from "lucide-react";

export default function MyDayPage() {
    const [plan, setPlan] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/plan")
            .then((response) => setPlan(response.data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    const handleRemove = (placeId) => {
        axios
            .delete(`http://localhost:5000/api/plan/${placeId}`)
            .then(() => setPlan(plan.filter((place) => place._id !== placeId)))
            .catch((error) => console.error("Error removing place", error));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-slate-200/60 border-b border-gray-300 px-8 py-6">
                <h1 className="text-3xl font-bold font-serif text-gray-800">My Day in Piliyandala</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage your personalized journey. Organize your stops.
                </p>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-5">
                {plan.map((place) => (
                    <div key={place._id}
                        className="flex items-center bg-white rounded-xl shadow-sm overflow-hidden">
                        <img src={place.photos?.[0]} alt={place.name}
                            className="w-32 h-24 object-cover bg-gray-200" />
                        <p className="flex-1 px-5 font-semibold text-gray-800">{place.name}</p>
                        <button onClick={() => handleRemove(place._id)} title="Remove"
                            className="px-5 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}

                {plan.length === 0 && (
                    <p className="text-center text-sm text-gray-500">
                        Your plan is empty. Add some places to start your day.
                    </p>
                )}

                <Link to="/"
                    className="mx-auto mt-2 flex items-center gap-2 border border-dashed border-gray-400 rounded-full px-8 py-3 text-xs font-semibold text-gray-600 hover:border-orange-600 hover:text-orange-600">
                    <Plus className="w-4 h-4" />
                    Add another stop to your day
                </Link>
            </div>
        </div>
    );
}