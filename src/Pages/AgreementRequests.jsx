import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AgreementRequests = () => {
    const { data: requests = [], refetch } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/agreements');
            const data = await res.json();
            return data.agreements;
        },
    });

    const handleStatusUpdate = async (id, newStatus) => {
        const res = await fetch(`http://localhost:5000/agreements/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });

        const result = await res.json();
        if (res.ok) {
            Swal.fire('Updated!', `Status set to ${newStatus}`, 'success');
            refetch();
        } else {
            Swal.fire('Error', result.message || 'Update failed', 'error');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Agreement Requests</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Apartment</th>
                            <th>Rent</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id} className="hover:bg-gray-50">
                                <td>{req.userName}</td>
                                <td>{req.userEmail}</td>
                                <td>
                                    Floor {req.floor}, Block {req.block}, Apt {req.apartmentNo}
                                </td>
                                <td>৳{req.rent}</td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-white text-sm ${req.status === 'approved'
                                            ? 'bg-green-500'
                                            : req.status === 'rejected'
                                                ? 'bg-red-500'
                                                : 'bg-yellow-500'
                                            }`}
                                    >
                                        {req.status}
                                    </span>
                                </td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => handleStatusUpdate(req._id, 'approved')}
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(req._id, 'rejected')}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgreementRequests;
