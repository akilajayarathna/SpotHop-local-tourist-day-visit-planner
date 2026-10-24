import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm";

const asArray = (value) => (Array.isArray(value) ? value : []);

const splitByComma = (text) =>
    text
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

const splitByLine = (text) =>
    text
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => {
            const [first, second = ""] = line.split("|");
            return [first.trim(), second.trim()];
        });

// place (from database) -> form values (all text)
function toFormValues(place) {
    if (!place) {
        return {
            name: "", slug: "", categoryId: "", description: "", location: "",
            distanceKm: "", lat: "", lng: "", photos: "", tags: "", highlights: "",
            openingHours: "", travelTips: "", phone: "", website: "", entryRequirements: "",
        };
    }

    return {
        name: place.name || "",
        slug: place.slug || "",
        categoryId: place.categoryId?._id || "",
        description: place.description || "",
        location: place.location || "",
        distanceKm: place.distanceKm ?? "",
        lat: place.lat ?? "",
        lng: place.lng ?? "",
        photos: asArray(place.photos).join(", "),
        tags: asArray(place.tags).join(", "),
        highlights: asArray(place.highlights).join(", "),
        openingHours: asArray(place.openingHours)
            .map((row) => `${row.days} | ${row.hours}`)
            .join("\n"),
        travelTips: asArray(place.travelTips)
            .map((tip) => `${tip.title} | ${tip.description}`)
            .join("\n"),
        phone: place.contact?.phone || "",
        website: place.contact?.website || "",
        entryRequirements: place.entryRequirements || "",
    };
}

// form values -> data to send to the server
function toPayload(form) {
    return {
        name: form.name.trim(),
        slug: form.slug.trim(),
        categoryId: form.categoryId,
        description: form.description.trim(),
        location: form.location.trim(),
        distanceKm: Number(form.distanceKm),
        lat: Number(form.lat),
        lng: Number(form.lng),
        photos: splitByComma(form.photos),
        tags: splitByComma(form.tags),
        highlights: splitByComma(form.highlights),
        openingHours: splitByLine(form.openingHours).map(([days, hours]) => ({ days, hours })),
        travelTips: splitByLine(form.travelTips).map(([title, description]) => ({ title, description })),
        contact: { phone: form.phone.trim(), website: form.website.trim() },
        entryRequirements: form.entryRequirements.trim(),
    };
}

function Field({ label, hint, children }) {
    return (
        <label className="block">
            <span className="block text-sm font-semibold text-gray-700 mb-1">{label}</span>
            {children}
            {hint && <span className="block text-xs text-gray-400 mt-1">{hint}</span>}
        </label>
    );
}

export default function PlaceForm({ place, categories, onClose, onSaved }) {
    const [form, setForm] = useState(toFormValues(place));
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = toPayload(form);

        const request = place
            ? axios.put(`http://localhost:5000/api/places/${place._id}`, data)
            : axios.post("http://localhost:5000/api/places", data);

        request
            .then(() => onSaved())
            .catch((err) =>
                setError(err.response?.data?.message || "Could not save the place")
            );
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold font-serif text-gray-800">
                        {place ? "Edit Place" : "Add New Place"}
                    </h2>
                    <button type="button" onClick={onClose}>
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Place name">
                            <input name="name" value={form.name} onChange={handleChange}
                                placeholder="The FAB, Piliyandala" required className={inputClass} />
                        </Field>

                        <Field label="Short name (used in the page link)" hint={`Slug: ${form.slug || "-"}`}>
                            <input name="slug" value={form.slug} onChange={handleChange}
                                placeholder="e.g. the-fab" required
                                pattern="[a-z0-9\-]+"
                                title="Use lowercase letters, numbers and hyphens only"
                                className={inputClass} />
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Category">
                            <select name="categoryId" value={form.categoryId} onChange={handleChange}
                                required className={inputClass}>
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Location text">
                            <input name="location" value={form.location} onChange={handleChange}
                                placeholder="Piliyandala, Sri Lanka" className={inputClass} />
                        </Field>
                    </div>

                    <Field label="Description">
                        <textarea name="description" value={form.description} onChange={handleChange}
                            rows={3} required className={inputClass} />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Field label="Distance (km)">
                            <input type="number" step="any" name="distanceKm" value={form.distanceKm}
                                onChange={handleChange} placeholder="2.6" required className={inputClass} />
                        </Field>
                        <Field label="Latitude">
                            <input type="number" step="any" name="lat" value={form.lat}
                                onChange={handleChange} placeholder="6.803" required className={inputClass} />
                        </Field>
                        <Field label="Longitude">
                            <input type="number" step="any" name="lng" value={form.lng}
                                onChange={handleChange} placeholder="79.923" required className={inputClass} />
                        </Field>
                    </div>

                    <Field label="Photo paths (first one is the main photo)">
                        <input name="photos" value={form.photos} onChange={handleChange}
                            placeholder="/fab.png" className={inputClass} />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Tags (separate with commas)">
                            <input name="tags" value={form.tags} onChange={handleChange}
                                placeholder="cafe, dessert" className={inputClass} />
                        </Field>
                        <Field label="Highlights (separate with commas)">
                            <input name="highlights" value={form.highlights} onChange={handleChange}
                                placeholder="Cafe, Dessert" className={inputClass} />
                        </Field>
                    </div>

                    <Field label="Opening hours (one per line: days | hours)">
                        <textarea name="openingHours" value={form.openingHours} onChange={handleChange}
                            rows={3}
                            placeholder={"Monday - Saturday | 8:00 AM - 8:00 PM\nSunday | 7:00 AM - 6:00 PM"}
                            className={inputClass} />
                    </Field>

                    <Field label="Travel tips (one per line: title | description)">
                        <textarea name="travelTips" value={form.travelTips} onChange={handleChange}
                            rows={3}
                            placeholder={"Plan a refreshment stop | Consider stopping for coffee while exploring."}
                            className={inputClass} />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Contact number">
                            <input name="phone" value={form.phone} onChange={handleChange}
                                placeholder="+94 74 391 4525" className={inputClass} />
                        </Field>
                        <Field label="Website">
                            <input name="website" value={form.website} onChange={handleChange}
                                placeholder="https://thefab.lk/" className={inputClass} />
                        </Field>
                    </div>

                    <Field label="Entry requirements">
                        <input name="entryRequirements" value={form.entryRequirements}
                            onChange={handleChange} placeholder="Free admission for locals"
                            className={inputClass} />
                    </Field>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div className="flex justify-end gap-3 mt-2">
                        <button type="button" onClick={onClose}
                            className="border border-gray-300 rounded-md px-5 py-2 text-sm">
                            Cancel
                        </button>
                        <button type="submit"
                            className="bg-orange-600 hover:bg-orange-700 text-white rounded-md px-5 py-2 text-sm font-semibold">
                            {place ? "Save Changes" : "Create Place"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}