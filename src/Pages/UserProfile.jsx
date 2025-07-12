import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const UserProfile = () => {
    const { user } = useContext(AuthContext);

    const { data: dbUser = {} } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`);
            return res.json();
        },
        enabled: !!user?.email,
    });

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
                    <strong>Agreement Accepted Date:</strong> <span>None</span>
                </div>
                <div>
                    <strong>Floor:</strong> <span>None</span>
                </div>
                <div>
                    <strong>Block:</strong> <span>None</span>
                </div>
                <div>
                    <strong>Room No:</strong> <span>None</span>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
