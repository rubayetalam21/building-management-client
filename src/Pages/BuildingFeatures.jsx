import React from "react";
import { FaBuilding, FaDoorOpen, FaCar, FaLock, FaRulerCombined } from "react-icons/fa";

const BuildingFeatures = () => {
    const features = [
        { icon: <FaBuilding />, name: "Floors", value: "G + 9" },
        { icon: <FaDoorOpen />, name: "Total Apartments", value: "160 Units" },
        { icon: <FaCar />, name: "Parking Slots", value: "120+" },
        { icon: <FaLock />, name: "24/7 Security" },
        { icon: <FaRulerCombined />, name: "Spacious Flats", value: "1250 sqft/unit" },
    ];

    return (
        <section className="max-w-6xl mx-auto my-16 px-6">
            <h2 className="text-3xl font-bold text-center text-teal-600 mb-2">
                Building Highlights
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
                    >
                        <div className="text-5xl text-teal-500 mb-4 group-hover:scale-110 transform transition-transform duration-300">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
                            {feature.name}
                        </h3>
                        {feature.value && (
                            <p className="text-gray-600 dark:text-gray-300 text-center mt-2 font-medium">
                                {feature.value}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BuildingFeatures;
