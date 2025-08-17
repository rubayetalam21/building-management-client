import React from "react";
import { FaSwimmingPool, FaDumbbell, FaParking, FaTree, FaWifi, FaCouch } from "react-icons/fa";

const AmenitiesSection = () => {
    const amenities = [
        { icon: <FaSwimmingPool className="text-teal-500 w-8 h-8" />, title: "Swimming Pool" },
        { icon: <FaDumbbell className="text-teal-500 w-8 h-8" />, title: "Gym & Fitness" },
        { icon: <FaParking className="text-teal-500 w-8 h-8" />, title: "24/7 Parking" },
        { icon: <FaTree className="text-teal-500 w-8 h-8" />, title: "Green Garden" },
        { icon: <FaWifi className="text-teal-500 w-8 h-8" />, title: "High-Speed WiFi" },
        { icon: <FaCouch className="text-teal-500 w-8 h-8" />, title: "Luxury Lounge" },
    ];

    return (
        <section className="max-w-6xl mx-auto my-16 px-6">
            <h2 className="text-3xl font-bold text-center text-teal-600 mb-2">
                Building Amenities
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {amenities.map((amenity, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                    >
                        <div className="mb-4">{amenity.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{amenity.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AmenitiesSection;
