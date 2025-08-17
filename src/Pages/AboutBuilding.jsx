import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // fixed import

const AboutBuilding = () => {
    return (
        <section className="relative py-24 px-6 sm:px-10 lg:px-20 overflow-hidden rounded-3xl">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10"></div>

            {/* Floating Decorative Circles */}
            <motion.div
                className="absolute -top-20 -left-20 w-96 h-96 bg-teal-200 dark:bg-teal-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
                className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-6 tracking-tight drop-shadow-md"> 🏢 About the Building </h2>

                    <motion.p
                        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Welcome to your next home! Our state-of-the-art residential building blends elegant design with modern functionality. Every corner is thoughtfully crafted to provide peace, comfort, and unmatched convenience.
                    </motion.p>

                    <motion.p
                        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Located in a prime area, this smart building features spacious apartments, secure access, and community-friendly layouts. Enjoy 24/7 security, rooftop gardens, underground parking, and high-speed elevators—all designed for urban excellence.
                    </motion.p>

                    <motion.p
                        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Whether you're a professional or a family, this building is built to match your lifestyle and aspirations.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        className="mt-10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to="/availableApartments"
                            className="inline-block px-8 py-4 font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300"
                        >
                            View Available Apartments
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-700 cursor-pointer ring-2 ring-teal-200 dark:ring-teal-700"
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <img
                            src="https://i.ibb.co/C50rmmgH/building.jpg"
                            alt="Modern Residential Building"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutBuilding;
