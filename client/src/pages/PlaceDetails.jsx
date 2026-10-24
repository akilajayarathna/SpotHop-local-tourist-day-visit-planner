import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import PlaceMap from "../components/PlaceMap";
import {
    ArrowLeft,
    Info,
    Clock,
    CalendarPlus,
    Phone,
    Globe,
    Navigation,
    CircleCheck,
    Lightbulb,
    MapPin,
} from "lucide-react";

export default function PlaceDetails() {
    const { slug } = useParams();
    const [place, setPlace] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/places/${slug}`)
            .then((response) => setPlace(response.data))
            .catch((err) => {
                console.error("Error fetching data", err);
                setError(true);
            });
    }, [slug]);

    if (error) return <p className="p-10 text-center">Place not found.</p>;
    if (!place) return <p className="p-10 text-center">Loading...</p>;

    const openingHours = Array.isArray(place.openingHours) ? place.openingHours : [];
    const travelTips = Array.isArray(place.travelTips) ? place.travelTips : [];
    const highlights = Array.isArray(place.highlights) ? place.highlights : [];
    const tags = Array.isArray(place.tags) ? place.tags : [];

    return (
        <div className="bg-slate-50 min-h-screen pb-10">
            {/* Hero */}
            <div className="relative h-72 md:h-96 overflow-hidden">
                <img
                    src={place.photos?.[0]}
                    alt={place.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                <Link
                    to="/places"
                    className="absolute top-5 left-5 flex items-center gap-2 bg-white/80 rounded-full px-4 py-1 text-sm hover:bg-white transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Explore
                </Link>

                <div className="absolute bottom-6 left-6 md:left-12 text-white">
                    {place.categoryId.name && (
                        <span className="inline-block bg-sky-500 text-xs font-semibold rounded px-2 py-0.5 mb-3">
                            {place.categoryId.name}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-5xl font-bold font-serif">{place.name}</h1>
                    {place.location && (
                        <p className="inline-flex items-center gap-2 mt-3 bg-white/70 text-gray-700 text-sm rounded-full px-3 py-1">
                            <MapPin className="w-4 h-4 text-orange-600" />
                            {place.location}
                        </p>
                    )}
                </div>

                <button className="absolute bottom-6 right-6 md:right-12 flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full px-5 py-2 text-sm font-semibold transition">
                    <CalendarPlus className="w-4 h-4" />
                    Add to Plan
                </button>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 mt-8">
                {/* Left column */}
                <div className="lg:col-span-2">
                    <h2 className="flex items-center gap-3 text-2xl font-bold font-serif text-gray-800">
                        <Info className="w-6 h-6 text-orange-600" />
                        About this Place
                    </h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">{place.description}</p>

                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-6">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-sky-100 text-sky-600 text-xs font-semibold uppercase rounded-full px-4 py-1"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <hr className="my-8 border-gray-300" />

                    {highlights.length > 0 && (
                        <>
                            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                                <CircleCheck className="w-5 h-5 text-orange-600" />
                                Highlights
                            </h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                {highlights.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-600 text-sm">
                                        <span className="w-2 h-2 rounded-full bg-orange-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {travelTips.length > 0 && (
                        <>
                            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mt-8">
                                <Lightbulb className="w-5 h-5 text-orange-600" />
                                Traveler Tips
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                {travelTips.map((tip, index) => (
                                    <div key={index} className="bg-orange-50 rounded-lg p-4">
                                        <p className="font-semibold text-orange-600 text-sm">{tip.title}</p>
                                        <p className="text-gray-600 text-xs mt-1">{tip.description}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {place.lat && place.lng && (
                        <>
                            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mt-8 mb-4">
                                <MapPin className="w-5 h-5 text-orange-600" />
                                Location
                            </h3>
                            <PlaceMap lat={place.lat} lng={place.lng} name={place.name} />
                        </>
                    )}

                </div>

                {/* Right column */}
                <div className="flex flex-col gap-6">
                    {openingHours.length > 0 && (
                        <div className="bg-white rounded-xl shadow p-6">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                                <Clock className="w-5 h-5 text-orange-600" />
                                Opening Hours
                            </h3>
                            <div className="mt-4 flex flex-col gap-3 text-sm">
                                {openingHours.map((row, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="text-gray-500">{row.days}</span>
                                        <span className="font-semibold text-gray-700">{row.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-bold text-gray-800">Practical Info</h3>
                        <p className="text-xs text-gray-500">Everything you need for your visit.</p>

                        <div className="mt-5 flex flex-col gap-4 text-sm">
                            {place.contact?.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-400">Contact Number</p>
                                        <p className="font-semibold text-gray-700">{place.contact.phone}</p>
                                    </div>
                                </div>
                            )}

                            {place.contact?.website && (
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-400">Official Website</p>
                                        <a
                                            href={place.contact.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-semibold text-gray-700 hover:text-orange-600"
                                        >
                                            {place.contact.website}
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <Navigation className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-400">Navigation</p>
                                    <a
                                        href={`https://www.openstreetmap.org/directions?from=&to=${place.lat}%2C${place.lng}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-semibold text-orange-600 hover:underline"
                                    >
                                        Get Directions
                                    </a>
                                </div>
                            </div>
                        </div>

                        {place.entryRequirements && (
                            <>
                                <hr className="my-5 border-gray-200" />
                                <p className="font-semibold text-sm text-gray-800">Entry Requirements</p>
                                <p className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                                    <CircleCheck className="w-4 h-4 text-green-500" />
                                    {place.entryRequirements}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}