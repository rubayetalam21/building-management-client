import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const UserProfile = () => {
    const { user, loading } = useContext(AuthContext);

    // Handle loading state from AuthProvider
    if (loading || !user) {
        return <p className="text-center py-10">Loading user profile...</p>;
    }

    const { data: dbUser = {}, isLoading: userLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://b11a12-server-side-rubayetalam21.vercel.app/users/${user?.email}`);
            return res.json();
        },
        enabled: !user?.email,
    });

    
    if (userLoading) {
        return <p className="text-center py-10">Fetching user data...</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
                <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-2 border-teal-500"
                />
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{user?.displayName || 'Unnamed User'}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                    <span className="inline-block mt-1 text-sm px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full">
                        Role: {dbUser?.role || 'user'}
                    </span>
                </div>
            </div>

            <div className="mt-6 space-y-2 text-gray-700">
                <div>
                    <strong>Agreement Accepted Date:</strong> <span>{dbUser?.agreementDate || 'None'}</span>
                </div>
                <div>
                    <strong>Floor:</strong> <span>{dbUser?.floor || 'None'}</span>
                </div>
                <div>
                    <strong>Block:</strong> <span>{dbUser?.block || 'None'}</span>
                </div>
                <div>
                    <strong>Room No:</strong> <span>{dbUser?.apartmentNo || 'None'}</span>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
