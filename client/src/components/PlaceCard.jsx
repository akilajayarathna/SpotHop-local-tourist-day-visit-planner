import { Link } from 'react-router'

export default function PlaceCard ({ photos, name, description, openingHours, slug }) {
    
    return (
        <div className="flex flex-col border border-gray-300 rounded-lg p-5 m-2 w-75 h-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="hover:scale-105 transition-transform duration-300 overflow-hidden rounded-lg">
                <img src={photos} alt={name} className="w-full h-48 object-cover rounded-lg mb-5" />
            </div>
            <h1 className="text-xl font-bold pb-5">{name}</h1>
            <p className="text-gray-900 pb-5 line-clamp-2">{description}</p>
            <div className="border border-gray-300 mb-5"></div>
            <div className="flex justify-between">
                <p className="text-gray-600">{openingHours}</p>
                <Link to={`/places/${slug}`} className="text-orange-600 hover:text-orange-800 font-semibold">
                    Details
                </Link>
            </div>
        </div>
    )
}