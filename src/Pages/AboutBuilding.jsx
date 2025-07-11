import React from 'react';
import { motion } from 'framer-motion';

const AboutBuilding = () => {
    return (
        <section className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-24 px-6 sm:px-10 overflow-hidden">
            {/* Decorative circle in background */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-100 dark:bg-teal-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse z-0"></div>

            <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-teal-600 mb-6">
                        🏢 About the Building
                    </h2>

                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
                        Welcome to your next home! Our state-of-the-art residential building blends elegant design with modern functionality.
                        Every corner is thoughtfully crafted to provide peace, comfort, and unmatched convenience.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
                        Located in a prime area, this smart building features spacious apartments, secure access, and community-friendly layouts.
                        Enjoy 24/7 security, rooftop gardens, underground parking, and high-speed elevators—all designed for urban excellence.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Whether you're a professional or a family, this building is built to match your lifestyle and aspirations.
                    </p>

                    {/* Optional CTA */}
                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <a
                            href="#apartments"
                            className="inline-block px-6 py-3 text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                        >
                            View Available Apartments
                        </a>
                    </motion.div>
                </motion.div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
                        <img
                            src="https://i.ibb.co/C50rmmgH/building.jpg"
                            alt="Modern Residential Building"
                            className="w-full object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutBuilding;
