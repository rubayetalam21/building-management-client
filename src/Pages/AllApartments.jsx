import { useQuery } from '@tanstack/react-query';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';

const AllApartments = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [page, setPage] = useState(1);
    const [minRent, setMinRent] = useState('');
    const [maxRent, setMaxRent] = useState('');
    const [debouncedMinRent, setDebouncedMinRent] = useState('');
    const [debouncedMaxRent, setDebouncedMaxRent] = useState('');
    const limit = 6;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedMinRent(minRent);
            setDebouncedMaxRent(maxRent);
            setPage(1);
        }, 500);
        return () => clearTimeout(timeout);
    }, [minRent, maxRent]);

    const { data = {}, isLoading, isError, refetch } = useQuery({
        queryKey: ['apartments', page, debouncedMinRent, debouncedMaxRent],
        queryFn: async () => {
            const queryParams = new URLSearchParams({
                page,
                limit,
                minRent: debouncedMinRent || '0',
                maxRent: debouncedMaxRent || '9999999',
            });
            const res = await fetch(`https://b11a12-server-side-rubayetalam21.vercel.app/apartments?${queryParams}`);
            return res.json();
        }
    });

    const apartments = Array.isArray(data?.apartments) ? data.apartments : [];
    const totalPages = data?.totalPages || 1;

    const handleAgreement = async (apt) => {
        if (!user) {
            return navigate('/auth/login', { state: { from: location }, replace: true });
        }

        try {
            const token = await user.getIdToken();

            const agreementData = {
                userName: user.displayName,
                userEmail: user.email,
                floor: apt.floor,
                block: apt.block,
                apartmentNo: apt.apartmentNo,
                rent: apt.rent,
            };

            const res = await fetch('https://b11a12-server-side-rubayetalam21.vercel.app/agreements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(agreementData),
            });

            const result = await res.json();
            if (res.ok) {
                Swal.fire('Success', 'Agreement request submitted!', 'success');
                refetch();
            } else {
                Swal.fire('Error', result.message || 'Something went wrong', 'error');
            }
        } catch (error) {
            Swal.fire('Error', error.message || 'Something went wrong', 'error');
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading apartments...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load apartments.</p>;

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto mt-16">
            <Helmet>
                <title>Apartments</title>
            </Helmet>

            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">All Apartments</h2>
            </div>

            {/* Rent Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-end">
                <div>
                    <label className="block text-sm font-medium mb-1">Min Rent</label>
                    <input
                        type="number"
                        value={minRent}
                        onChange={(e) => setMinRent(e.target.value)}
                        className="border p-2 rounded w-full sm:w-40"
                        placeholder="e.g. 10000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Max Rent</label>
                    <input
                        type="number"
                        value={maxRent}
                        onChange={(e) => setMaxRent(e.target.value)}
                        className="border p-2 rounded w-full sm:w-40"
                        placeholder="e.g. 20000"
                    />
                </div>
            </div>

            {/* Apartment Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {apartments.length > 0 ? (
                    apartments.map((apt) => (
                        <div key={apt.apartmentNo} className="shadow rounded-lg p-4 border bg-white dark:bg-gray-800">
                            <img src={apt.image} alt="Apartment" className="h-48 w-full object-cover rounded" />
                            <h2 className="text-lg font-semibold mt-2">Apartment {apt.apartmentNo}</h2>
                            <p>Floor: {apt.floor}</p>
                            <p>Block: {apt.block}</p>
                            <p>Rent: ৳{apt.rent}</p>
                            <button
                                onClick={() => handleAgreement(apt)}
                                className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Apply for Agreement
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No apartments found in this range.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="mt-10 overflow-x-auto">
                <div className="flex justify-center gap-2 w-max mx-auto">
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
                            className={`px-3 py-1 rounded text-sm ${page === i + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-300'
                                }`}
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
        </div>
    );
};

export default AllApartments;
