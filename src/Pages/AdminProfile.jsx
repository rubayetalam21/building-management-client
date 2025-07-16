import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { MdApartment, MdGroups } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
    PieChart, Pie, Cell, Tooltip as RechartTooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

const COLORS = ['#2dd4bf', '#facc15']; // teal, yellow

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('https://b11a12-server-side-rubayetalam21.vercel.app/admin/stats');
                const data = await res.json();
                setStats(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch admin stats:', err);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading || !stats) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 animate-pulse">Loading Admin Stats...</p>
            </div>
        );
    }

    const availablePercentage = stats.totalApartments
        ? ((stats.availableApartments / stats.totalApartments) * 100).toFixed(1)
        : 0;

    const agreementPercentage = stats.totalApartments
        ? ((stats.agreementApartments / stats.totalApartments) * 100).toFixed(1)
        : 0;

    const statsData = [
        { icon: <MdApartment className="text-3xl text-teal-500" />, label: 'Total Apartments', value: stats.totalApartments },
        { icon: <MdApartment className="text-3xl text-green-500" />, label: 'Available Apartments', value: `${availablePercentage}%` },
        { icon: <FaHandshake className="text-3xl text-yellow-500" />, label: 'Agreement Apartments', value: `${agreementPercentage}%` },
        { icon: <AiOutlineUser className="text-3xl text-purple-500" />, label: 'Total Users', value: stats.totalUsers },
        { icon: <MdGroups className="text-3xl text-pink-500" />, label: 'Members', value: stats.totalMembers },
    ];

    // Chart Data
    const pieData = [
        { name: 'Available', value: stats.availableApartments },
        { name: 'Agreement', value: stats.agreementApartments },
    ];

    const barData = [
        { name: 'Users', value: stats.totalUsers },
        { name: 'Members', value: stats.totalMembers },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded shadow text-gray-800 dark:text-gray-200"
        >
            <h2 className="text-2xl font-bold mb-6 text-teal-600 dark:text-teal-400">Admin Profile</h2>

            <div className="flex items-center gap-6 mb-6">
                <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="Admin"
                    className="w-24 h-24 rounded-full border object-cover"
                />
                <div>
                    <h3 className="text-xl font-semibold">{user?.displayName || 'Admin'}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center mb-10">
                {statsData.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 border rounded shadow bg-white dark:bg-gray-800 hover:shadow-lg transition-all"
                    >
                        <div className="mb-2 flex justify-center">{item.icon}</div>
                        <p className="text-xl font-bold">{item.value}</p>
                        <p className="text-gray-600 dark:text-gray-300">{item.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-4 text-center">Apartment Availability</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartTooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-4 text-center">User Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <RechartTooltip />
                            <Bar dataKey="value" fill="#2dd4bf" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminProfile;
