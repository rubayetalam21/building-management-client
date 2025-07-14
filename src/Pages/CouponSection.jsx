import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaTag } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider'; // Make sure this path is correct

const CouponSection = () => {
    const { user } = useContext(AuthContext);

    const { data: coupons = [], isLoading, error } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            if (!user) throw new Error('User not authenticated');
            const token = await user.getIdToken();
            const res = await fetch('http://localhost:5000/coupons', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Failed to fetch coupons');
            return res.json();
        },
        enabled: !!user, // Only run if user is logged in
    });

    if (isLoading) return <p className="text-center py-10">Loading coupons...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load coupons</p>;

    const availableCoupons = coupons.filter(coupon => coupon.available);

    return (
        <section className="py-16 bg-base-100 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-teal-600 mb-2">🎁 Exclusive Member Coupons</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Apply these coupons when signing your apartment agreement!
                </p>
            </div>

            {availableCoupons.length === 0 ? (
                <p className="text-center text-gray-500">No active coupons at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {availableCoupons.map((coupon, index) => (
                        <motion.div
                            key={coupon._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: false }}
                            className={`bg-gradient-to-br ${coupon.bgColor || 'from-teal-500 to-cyan-600'} 
                text-white p-6 rounded-xl shadow-lg relative overflow-hidden`}
                        >
                            <FaTag className="absolute top-4 right-4 text-2xl opacity-20" />
                            <h3 className="text-2xl font-bold mb-2">{coupon.title || coupon.couponCode}</h3>
                            <p className="mb-4">{coupon.description}</p>
                            <div className="bg-white text-teal-700 font-mono px-4 py-1 rounded-full inline-block text-sm shadow">
                                Code: {coupon.couponCode}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default CouponSection;
