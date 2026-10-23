import { useEffect, useState } from "react"
import axios from "axios"

export default function PlaceDetails ({ name }) {
    const [placeDetails, setPlaceDetails] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/places/${name}`)
            .then((response) => setPlaceDetails(response.data))
            .catch((error) => console.error("Error fetching data", error));
    }, [])
    
    return (
        <div>
            {
                placeDetails.map((item) => (
                    <>
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                    </>
                ))
            }
        </div>
    )
}