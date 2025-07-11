import { useQuery } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const AllApartments = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [minRent, setMinRent] = useState('');
    const [maxRent, setMaxRent] = useState('');
    const limit = 6;

    const { data = {}, isLoading, isError, refetch } = useQuery({
        queryKey: ['apartments', page],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/apartments?page=${page}&limit=${limit}`);
            return res.json();
        }
    });

    const apartments = Array.isArray(data?.apartments) ? data.apartments : [];
    const totalPages = data?.totalPages || 1;

    const filteredApartments = apartments.filter((apt) => {
        const min = parseInt(minRent) || 0;
        const max = parseInt(maxRent) || Infinity;
        return apt.rent >= min && apt.rent <= max;
    });

    const handleAgreement = async (apt) => {
        if (!user) return navigate('/login');

        const agreementData = {
            userName: user.displayName,
            userEmail: user.email,
            floor: apt.floor,
            block: apt.block,
            apartmentNo: apt.apartmentNo,
            rent: apt.rent,
        };

        const res = await fetch('http://localhost:5000/agreements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(agreementData),
        });

        const result = await res.json();
        if (res.ok) {
            Swal.fire('Success', 'Agreement request submitted!', 'success');
            refetch();
        } else {
            Swal.fire('Error', result.message || 'Already applied.', 'error');
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading apartments...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load apartments.</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-teal-600 mb-2">All Apartments</h2>

            </div>
            {/* Search by Rent */}
            <div className="flex gap-4 mb-6 items-end">
                <div>
                    <label className="block text-sm font-medium mb-1">Min Rent</label>
                    <input
                        type="number"
                        value={minRent}
                        onChange={(e) => setMinRent(e.target.value)}
                        className="border p-2 rounded w-40"
                        placeholder="e.g. 10000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Max Rent</label>
                    <input
                        type="number"
                        value={maxRent}
                        onChange={(e) => setMaxRent(e.target.value)}
                        className="border p-2 rounded w-40"
                        placeholder="e.g. 20000"
                    />
                </div>
            </div>

            {/* Apartment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredApartments.length > 0 ? (
                    filteredApartments.map((apt) => (
                        <div key={apt.apartmentNo} className="shadow rounded-lg p-4 border">
                            <img src={apt.image} alt="Apartment" className="h-48 w-full object-cover rounded" />
                            <h2 className="text-lg font-semibold mt-2">Apartment {apt.apartmentNo}</h2>
                            <p>Floor: {apt.floor}</p>
                            <p>Block: {apt.block}</p>
                            <p>Rent: ৳{apt.rent}</p>
                            <button
                                onClick={() => handleAgreement(apt)}
                                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Apply for Agreement
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500">No apartments found in this range.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {[...Array(totalPages).keys()].map((i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllApartments;
