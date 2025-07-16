import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { MdApartment, MdGroups, MdPeopleAlt } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { FaHandshake } from 'react-icons/fa';

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalApartments: 0,
        availableApartments: 0,
        agreementApartments: 0,
        totalUsers: 0,
        totalMembers: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [aptRes, unavailRes, userRes, memberRes] = await Promise.all([
                    fetch('https://b11a12-server-side-rubayetalam21.vercel.app/apartments/count'),
                    fetch('https://b11a12-server-side-rubayetalam21.vercel.app/agreements/unavailable/count'),
                    fetch('https://b11a12-server-side-rubayetalam21.vercel.app/users/users/count'),
                    fetch('https://b11a12-server-side-rubayetalam21.vercel.app/users/members/count'),
                ]);

                const totalApartments = await aptRes.json();
                const agreementApartments = await unavailRes.json();
                const totalUsers = await userRes.json();
                const totalMembers = await memberRes.json();

                const calculatedAvailable = (totalApartments.count || 0) - (agreementApartments.count || 0);

                setStats({
                    totalApartments: totalApartments.count || 0,
                    availableApartments: calculatedAvailable < 0 ? 0 : calculatedAvailable,
                    agreementApartments: agreementApartments.count || 0,
                    totalUsers: totalUsers.count || 0,
                    totalMembers: totalMembers.count || 0,
                });
            } catch (err) {
                console.error('Failed to fetch admin stats:', err);
            }
        };

        fetchStats();
    }, []);

    const availablePercentage = stats.totalApartments
        ? ((stats.availableApartments / stats.totalApartments) * 100).toFixed(1)
        : 0;

    const agreementPercentage = stats.totalApartments
        ? ((stats.agreementApartments / stats.totalApartments) * 100).toFixed(1)
        : 0;

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded shadow text-gray-800 dark:text-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-teal-600 dark:text-teal-400">Admin Profile</h2>

            <div className="flex items-center gap-6 mb-6">
                <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="Admin"
                    className="w-24 h-24 rounded-full border"
                />
                <div>
                    <h3 className="text-xl font-semibold">{user?.displayName || 'Admin'}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
                    <MdApartment className="text-3xl text-teal-500 mx-auto mb-2" />
                    <p className="text-xl font-bold">{stats.totalApartments}</p>
                    <p>Total Apartments</p>
                </div>

                <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
                    <MdApartment className="text-3xl text-green-500 mx-auto mb-2" />
                    <p className="text-xl font-bold">{availablePercentage}%</p>
                    <p>Available Apartments</p>
                </div>

                <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
                    <FaHandshake className="text-3xl text-yellow-500 mx-auto mb-2" />
                    <p className="text-xl font-bold">{agreementPercentage}%</p>
                    <p>Agreement Apartments</p>
                </div>

                <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
                    <AiOutlineUser className="text-3xl text-purple-500 mx-auto mb-2" />
                    <p className="text-xl font-bold">{stats.totalUsers}</p>
                    <p>Total Users</p>
                </div>

                <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
                    <MdGroups className="text-3xl text-pink-500 mx-auto mb-2" />
                    <p className="text-xl font-bold">{stats.totalMembers}</p>
                    <p>Members</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
