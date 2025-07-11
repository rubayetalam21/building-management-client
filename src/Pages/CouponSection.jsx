import React from 'react';
import { motion } from 'framer-motion';
import { FaTag } from 'react-icons/fa';

const coupons = [
    {
        code: 'RENT10',
        title: '10% Off First Month',
        description: 'Get 10% off your first rent payment when you sign a new agreement this month!',
        bgColor: 'from-green-400 to-blue-500'
    },
    {
        code: 'SUMMER20',
        title: 'Summer Special',
        description: 'Enjoy BDT 2,000 off on selected apartments booked in July.',
        bgColor: 'from-yellow-400 to-orange-500'
    },
    {
        code: 'FREEUTIL',
        title: 'Free Utilities Offer',
        description: 'Book now and get FREE water and gas bill for 2 months.',
        bgColor: 'from-purple-400 to-pink-500'
    }
];

const CouponSection = () => {
    return (
        <section className="py-16 bg-base-100 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-teal-600 mb-2">🎁 Exclusive Member Coupons</h2>
                <p className="text-gray-600 dark:text-gray-300">Apply these coupons when signing your apartment agreement!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {coupons.map((coupon, index) => (
                    <motion.div
                        key={coupon.code}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: false }}
                        className={`bg-gradient-to-br ${coupon.bgColor} text-white p-6 rounded-xl shadow-lg relative overflow-hidden`}
                    >
                        <FaTag className="absolute top-4 right-4 text-2xl opacity-20" />
                        <h3 className="text-2xl font-bold mb-2">{coupon.title}</h3>
                        <p className="mb-4">{coupon.description}</p>
                        <div className="bg-white text-teal-700 font-mono px-4 py-1 rounded-full inline-block text-sm shadow">
                            Code: {coupon.code}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CouponSection;
