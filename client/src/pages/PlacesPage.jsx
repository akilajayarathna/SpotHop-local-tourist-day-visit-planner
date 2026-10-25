import { useEffect, useState } from "react";
import axios from 'axios';
import PlaceCard from "../components/PlaceCard";
import FilterRow from '../components/FilterRow'

export default function PlacesPage () {
    const [places, setPlaces] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        axios
        .get('http://localhost:5000/api/places/')
        .then((response) => setPlaces(response.data))
        .catch((error) => console.error("Error fetching data", error));
    }, []);

    const filteredPlaces = [];

    for (const place of places) {
        
        const matchesCategory =
            currentCategory === null || place.categoryId._id === currentCategory;

        const matchesSearch = place.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase());

        if (matchesCategory && matchesSearch) {
            filteredPlaces.push(place);
        }
    }

    return (
        <div className="flex flex-col">
            <h1 className="font-bold m-5 text-2xl text-gray-600">Spots to Visit</h1>
            <FilterRow 
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                setSearchText={setSearchText}
            />
            <div className="flex flex-wrap justify-center">
                {filteredPlaces.map(
                    (item) => (
                        <PlaceCard
                            key={item._id}
                            photos={item.photos[0]}
                            name={item.name}
                            description={item.description}
                            openingHours={item.openingHours?.[0]?.hours}
                            slug={item.slug}
                        />
                    )
                )}
            </div>
        </div>
    );

};

