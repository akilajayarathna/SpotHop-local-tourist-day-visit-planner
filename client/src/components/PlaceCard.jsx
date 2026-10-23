import { Routes, Route } from 'react-router'
import PlaceDetails from '../pages/PlaceDetails'

export default function PlaceCard ({ photos, name, description, openingHours }) {

    return (
        <div className="border border-gray-300 rounded-lg p-5 m-2 w-75 h-100">
            <div>
                {photos}
            </div>
            <h1 className="text-xl font-bold pb-5">{name}</h1>
            <p className="text-gray-900 pb-5">{description}</p>
            <div className="border-1 border-gray-300 mb-5"></div>
            <div>
                <p className="text-gray-600">{openingHours}</p>
                <Routes>
                    <Route
                        path={ `/places/${name}` }
                        element={<PlaceDetails
                                        key={name}
                                        name={name}
                                />}
                    >
                        Details
                    </Route>
                </Routes>
            </div>
        </div>
    )
}