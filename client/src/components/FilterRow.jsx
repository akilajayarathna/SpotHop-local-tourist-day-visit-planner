import { useState, useEffect } from "react";
import axios from 'axios'
import { Search, ListFilter } from "lucide-react";

export default function FilterRow ({ currentCategory, setCurrentCategory, setSearchText }) {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/categories')
            .then((response) => setCategories(response.data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    return (
        <div className="flex justify-between items-center">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                    type="text"
                    name="search"
                    placeholder="Where do you want to go?"
                    onChange={ (e) => setSearchText(e.target.value) }
                    className="border rounded-md border-gray-400 py-2 pl-10 pr-5"
                >
                </input>
            </div>

            <div className="flex justify-around items-center gap-5 bg-gray-300/40 rounded-lg py-2 px-5">
                {categories.map((item) => (
                    <button
                        key={item._id}
                        onClick={ () => setCurrentCategory(currentCategory === item._id ? null : item._id) }
                        className={`rounded-lg px-5 py-1 transition-all duration-300 ${
                            currentCategory === item._id
                                ? "bg-orange-600 text-white font-semibold"
                                : "bg-white hover:text-orange-600 hover:font-semibold"
                        }`}
                    >{item.name}
                    </button>
                ))}
            </div>

            <div>
                <button
                    className="border rounded-md border-gray-400 py-2 px-5"
                >
                    <ListFilter className="w-5 h-5 text-gray-600" />
                </button>
            </div>

        </div>
    )
};