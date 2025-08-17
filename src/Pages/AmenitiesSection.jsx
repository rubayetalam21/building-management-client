import React from "react";
import {
    FaSwimmingPool,
    FaDumbbell,
    FaParking,
    FaTree,
    FaWifi,
    FaCouch,
} from "react-icons/fa";

const AmenitiesSection = () => {
    const amenities = [
        {
            icon: <FaSwimmingPool className="w-10 h-10" />,
            title: "Swimming Pool",
            desc: "Enjoy a refreshing swim anytime with our modern pool facility.",
            gradient: "from-cyan-200 via-cyan-100 to-white dark:from-cyan-600 dark:via-cyan-700 dark:to-gray-900",
        },
        {
            icon: <FaDumbbell className="w-10 h-10" />,
            title: "Gym & Fitness",
            desc: "Stay fit with state-of-the-art gym equipment and workout zones.",
            gradient: "from-pink-200 via-pink-100 to-white dark:from-pink-600 dark:via-pink-700 dark:to-gray-900",
        },
        {
            icon: <FaParking className="w-10 h-10" />,
            title: "24/7 Parking",
            desc: "Secure and spacious parking available around the clock.",
            gradient: "from-indigo-200 via-indigo-100 to-white dark:from-indigo-600 dark:via-indigo-700 dark:to-gray-900",
        },
        {
            icon: <FaTree className="w-10 h-10" />,
            title: "Green Garden",
            desc: "Relax in lush green surroundings and landscaped gardens.",
            gradient: "from-green-200 via-green-100 to-white dark:from-green-600 dark:via-green-700 dark:to-gray-900",
        },
        {
            icon: <FaWifi className="w-10 h-10" />,
            title: "High-Speed WiFi",
            desc: "Seamless internet connectivity for work, streaming, and gaming.",
            gradient: "from-teal-200 via-teal-100 to-white dark:from-teal-600 dark:via-teal-700 dark:to-gray-900",
        },
        {
            icon: <FaCouch className="w-10 h-10" />,
            title: "Luxury Lounge",
            desc: "A cozy lounge area for socializing and unwinding in style.",
            gradient: "from-amber-200 via-amber-100 to-white dark:from-amber-600 dark:via-amber-700 dark:to-gray-900",
        },
    ];

    return (
        <section className="relative py-20 px-6">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10"></div>

            {/* Title */}
            <div className="text-center mb-14">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                    Building Amenities
                </h2>
                <div className="mt-3 w-32 h-1 mx-auto bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"></div>
            </div>

            {/* Amenities Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {amenities.map((amenity, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center p-8 rounded-2xl shadow-lg 
              bg-gradient-to-br ${amenity.gradient}
              border border-gray-100 dark:border-gray-700
              transform transition-all duration-500 hover:scale-105 hover:shadow-2xl
              animate-fade-in-up`}
                        style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "both" }}
                    >
                        {/* Icon */}
                        <div className="mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
                            {amenity.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {amenity.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm leading-relaxed">
                            {amenity.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Animation */}
            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>
        </section>
    );
};

export default AmenitiesSection;
