import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from 'react-router'

export default function PlaceDetails () {
    const { slug } = useParams();
    const [placeDetails, setPlaceDetails] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/places/${slug}`)
            .then((response) => setPlaceDetails(response.data))
            .catch((error) => console.error("Error fetching data", error));
    }, [slug]);

    if (!placeDetails) return <p>Loading...</p>
    
    return (
        <div>
            <p>{placeDetails.name}</p>
            <p>{placeDetails.description}</p>
        </div>
    );
}