import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Plus, Pencil, Trash2, MapPin, Tag } from "lucide-react";
import PlaceForm from "../components/PlaceForm";

export default function DashboardPage() {
    const [places, setPlaces] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingPlace, setEditingPlace] = useState(null);

    const loadPlaces = () => {
        axios
            .get("http://localhost:5000/api/places/")
            .then((response) => setPlaces(response.data))
            .catch((error) => console.error("Error fetching data", error));
    };

    useEffect(() => {
        loadPlaces();

        axios
            .get("http://localhost:5000/api/categories")
            .then((response) => setCategories(response.data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    const openAddForm = () => {
        setEditingPlace(null);
        setShowForm(true);
    };

    const openEditForm = (place) => {
        setEditingPlace(place);
        setShowForm(true);
    };

    const handleSaved = () => {
        setShowForm(false);
        loadPlaces();
    };

    const handleDelete = (place) => {
        if (!window.confirm(`Delete "${place.name}"?`)) return;

        axios
            .delete(`http://localhost:5000/api/places/${place._id}`)
            .then(() => loadPlaces())
            .catch((error) => console.error("Error deleting place", error));
    };

    const countFor = (categoryId) =>
        places.filter((place) => place.categoryId?._id === categoryId).length;

    const filteredPlaces = places.filter((place) =>
        place.name.toLowerCase().includes(searchText.trim().toLowerCase())
    );

    return (
        <div className="bg-slate-50 min-h-screen p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Content Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage Piliyandala travel spots, eateries, and cultural landmarks.
                        </p>
                    </div>
                    <button
                        onClick={openAddForm}
                        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-xl px-5 py-2 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Place
                    </button>
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    <div className="bg-white rounded-2xl shadow-sm p-5 flex justify-between items-center">
                        <div>
                            <p className="text-xs text-gray-500">Total Places</p>
                            <p className="text-3xl font-bold font-serif text-gray-800 mt-1">{places.length}</p>
                        </div>
                        <div className="bg-orange-100 rounded-lg p-3">
                            <MapPin className="w-5 h-5 text-orange-600" />
                        </div>
                    </div>

                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="bg-white rounded-2xl shadow-sm p-5 flex justify-between items-center"
                        >
                            <div>
                                <p className="text-xs text-gray-500">{category.name}</p>
                                <p className="text-3xl font-bold font-serif text-gray-800 mt-1">
                                    {countFor(category._id)}
                                </p>
                            </div>
                            <div className="bg-orange-100 rounded-lg p-3">
                                <Tag className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search */}
                <div className="flex justify-end mt-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            name="search"
                            placeholder="Search names..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="border rounded-md border-gray-400 py-2 pl-10 pr-5 bg-white"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm mt-4 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-100 text-sm text-gray-500">
                            <tr>
                                <th className="p-4 font-medium">Image</th>
                                <th className="p-4 font-medium">Place Name</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlaces.map((place) => (
                                <tr key={place._id} className="border-t border-gray-200">
                                    <td className="p-4">
                                        {place.photos?.[0] ? (
                                            <img
                                                src={place.photos[0]}
                                                alt={place.name}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-lg bg-gray-200" />
                                        )}
                                    </td>
                                    <td className="p-4 text-sm font-semibold text-gray-800">{place.name}</td>
                                    <td className="p-4">
                                        <span className="bg-sky-400 text-white text-xs font-semibold rounded-full px-3 py-0.5">
                                            {place.categoryId?.name}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-4">
                                            <button onClick={() => openEditForm(place)} title="Edit">
                                                <Pencil className="w-5 h-5 text-gray-700 hover:text-orange-600" />
                                            </button>
                                            <button onClick={() => handleDelete(place)} title="Delete">
                                                <Trash2 className="w-5 h-5 text-gray-700 hover:text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredPlaces.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-6 text-center text-sm text-gray-500">
                                        No places found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showForm && (
                <PlaceForm
                    place={editingPlace}
                    categories={categories}
                    onClose={() => setShowForm(false)}
                    onSaved={handleSaved}
                />
            )}
        </div>
    );
}