import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

const AvailableApartments = () => {
    const { data = {}, isLoading, isError } = useQuery({
        queryKey: ['availableApartments'],
        queryFn: async () => {
            const res = await fetch('https://b11a12-server-side-rubayetalam21.vercel.app/available-apartments');
            return res.json();
        }
    });

    const apartments = Array.isArray(data.apartments) ? data.apartments : [];
    const count = data.count || 0;

    if (isLoading) return <div className="text-center py-10">Loading available apartments...</div>;
    if (isError) return <div className="text-center text-red-500 py-10">Failed to load data</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 mt-16">
            <Helmet>
                <title>Available Apartments</title>
            </Helmet>

            <h2 className="text-3xl font-bold text-center text-teal-600 mb-2">
                Available Apartments
            </h2>
            <div className="flex justify-center mt-4 mb-10">
                <div className="bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-800 dark:to-cyan-800 
                    text-center rounded-xl shadow-lg px-6 py-4 w-full sm:w-1/2 md:w-1/3">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-2">
                        🟢 Total Available Apartments
                    </h3>
                    <div className="text-4xl font-bold text-teal-600 dark:text-teal-300">
                        {count}
                    </div>
                </div>
            </div>


            {apartments.length === 0 ? (
                <p className="text-center text-gray-500">No available apartments found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {apartments.map((apt) => (
                        <div key={apt.apartmentNo} className="shadow rounded-lg p-4 border bg-white dark:bg-gray-800">
                            <img src={apt.image} alt="Apartment" className="h-48 w-full object-cover rounded" />
                            <h2 className="text-lg font-semibold mt-2">Apartment {apt.apartmentNo}</h2>
                            <p>Floor: {apt.floor}</p>
                            <p>Block: {apt.block}</p>
                            <p>Rent: ৳{apt.rent}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableApartments;
