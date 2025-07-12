import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const MemberProfile = () => {
    const { user } = useContext(AuthContext);

    // Fetch member profile info from backend by user email
    const { data, isLoading, error } = useQuery({
        queryKey: ['memberProfile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/members/profile/${user.email}`);
            if (!res.ok) throw new Error('Failed to fetch member profile');
            return res.json();
        },
    });

    if (isLoading) return <p className="text-center py-10">Loading profile...</p>;
    if (error) return <p className="text-center text-red-500">Error loading profile</p>;

    const {
        displayName,
        photoURL,
        email,
        agreementAcceptDate,
        apartmentInfo = {},
    } = data || {};

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md mt-10">
            <h2 className="text-3xl font-semibold mb-6 text-teal-600">Member Profile</h2>
            <div className="flex items-center space-x-6 mb-6">
                <img
                    src={photoURL || 'https://via.placeholder.com/80'}
                    alt="User avatar"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-xl font-bold">{displayName}</h3>
                    <p className="text-gray-600">{email}</p>
                </div>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold text-lg mb-1">Agreement Accept Date:</h4>
                <p>{agreementAcceptDate ? new Date(agreementAcceptDate).toLocaleDateString() : 'N/A'}</p>
            </div>

            <div>
                <h4 className="font-semibold text-lg mb-1">Rented Apartment Info:</h4>
                <p>Floor: {apartmentInfo.floor || 'N/A'}</p>
                <p>Block: {apartmentInfo.block || 'N/A'}</p>
                <p>Room No: {apartmentInfo.roomNo || 'N/A'}</p>
            </div>
        </div>
    );
};

export default MemberProfile;
