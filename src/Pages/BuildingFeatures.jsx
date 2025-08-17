import React from "react";
import { FaBuilding, FaDoorOpen, FaCar, FaLock, FaRulerCombined } from "react-icons/fa";

const BuildingFeatures = () => {
    const features = [
        {
            icon: <FaBuilding />,
            name: "Floors",
            value: "B + G + 9",
            description: "Modern high-rise structure designed for comfort and elegance."
        },
        {
            icon: <FaDoorOpen />,
            name: "Total Apartments",
            value: "100 Units",
            description: "Spacious and well-ventilated homes with natural lighting."
        },
        {
            icon: <FaCar />,
            name: "Parking Slots",
            value: "100",
            description: "Ample parking space ensuring convenience and security."
        },
        {
            icon: <FaLock />,
            name: "24/7 Security",
            description: "Advanced surveillance with professional security staff."
        },
        {
            icon: <FaRulerCombined />,
            name: "Spacious Flats",
            value: "1250 sqft/unit",
            description: "Well-planned layouts providing maximum comfort and utility."
        },
    ];

    return (
        <section className="relative py-20">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10"></div>

            {/* Title */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                    Building Highlights
                </h2>
                <div className="mt-2 w-28 h-1 mx-auto bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"></div>
            </div>

            {/* Features Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-8 rounded-3xl shadow-lg 
                        bg-gradient-to-br from-white via-teal-50 to-cyan-50 
                        dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 
                        backdrop-blur-md border border-gray-100 dark:border-gray-700
                        hover:scale-105 hover:shadow-2xl transition-all duration-500 group"
                    >
                        {/* Icon */}
                        <div className="text-6xl bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-full p-5 shadow-lg mb-4 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
                            {feature.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
                            {feature.name}
                        </h3>

                        {/* Value */}
                        {feature.value && (
                            <p className="text-gray-700 dark:text-gray-300 text-center mt-2 font-medium">
                                {feature.value}
                            </p>
                        )}

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 text-center mt-3 text-sm leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BuildingFeatures;
