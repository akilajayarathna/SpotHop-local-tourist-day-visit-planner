import { useEffect, useState } from "react";
import axios from 'axios';
import PlaceCard from "../components/PlaceCard";

export default function PlacesPage () {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:5000/api/places/')
        .then((response) => setPlaces(response.data))
        .catch((error) => console.error("Error fetching data", error));
    }, []);

    return (
        <>
            <div className="flex flex-wrap justify-center">
                {places.map(
                    (item) => (
                        <PlaceCard
                            key={item.id}
                            photos={item.photos[0]}
                            name={item.name}
                            description={item.description}
                            openingHours={item.openingHours}
                        />
                    )
                )}
            </div>
        </>
    );

};

