import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';

const LocationSection = () => {
    const position = [23.7805733, 90.2792399]; // Example coordinates for Badda, Dhaka

    // Google Maps Directions URL
    const googleMapsURL = `https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`;

    return (
        <section className="py-20 rounded-lg bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                {/* Text Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold text-teal-600 mb-6">📍 Location & Directions</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        Welcome to our residential apartment located in Badda, Dhaka – just minutes from the bustling city center.
                        Enjoy easy access via major roads and public transport.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                        <li>5 min from Gulshan-1</li>
                        <li>Near Badda Link Road</li>
                        <li>Access to metro rail & bus stations</li>
                        <li>Surrounded by top schools, hospitals, and shops</li>
                    </ul>

                    {/* Directions Button */}
                    <a
                        href={googleMapsURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        🚗 Get Directions
                    </a>
                </motion.div>

                {/* Map */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <MapContainer
                        center={position}
                        zoom={15}
                        scrollWheelZoom={false}
                        className="h-80 w-full rounded-xl shadow-lg z-0"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                Home Arc Apartment – Badda, Dhaka
                            </Popup>
                        </Marker>
                    </MapContainer>
                </motion.div>
            </div>
        </section>
    );
};

export default LocationSection;
