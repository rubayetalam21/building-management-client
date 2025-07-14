import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useUserRole from '../hooks/useUserRole';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const AgreementRequests = () => {
    const { user } = useContext(AuthContext);
    const { role, isLoading: roleLoading } = useUserRole();

    const fetchAgreements = async () => {
        const token = await user.getIdToken();

        const res = await fetch('https://b11a12-server-side-rubayetalam21.vercel.app/agreements', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        return data.agreements?.filter(req => req.status !== 'checked') || [];
    };

    const { data: requests = [], refetch, isLoading } = useQuery({
        queryKey: ['agreements'],
        queryFn: fetchAgreements,
        enabled: role === 'admin' && !!user
    });

    const handleAccept = async (request) => {
        const token = await user.getIdToken();

        const agreementUpdate = await fetch(`https://b11a12-server-side-rubayetalam21.vercel.app/agreements/${request._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status: 'checked' })
        });

        const roleUpdate = await fetch(`https://b11a12-server-side-rubayetalam21.vercel.app/users/role/${request.userEmail}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ role: 'member' })
        });

        if (agreementUpdate.ok && roleUpdate.ok) {
            Swal.fire('Accepted!', 'Agreement approved and role updated.', 'success');
            refetch();
        } else {
            Swal.fire('Error', 'Something went wrong.', 'error');
        }
    };

    const handleReject = async (request) => {
        const token = await user.getIdToken();

        const res = await fetch(`https://b11a12-server-side-rubayetalam21.vercel.app/agreements/${request._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status: 'checked' })
        });

        if (res.ok) {
            Swal.fire('Rejected!', 'Agreement rejected.', 'info');
            refetch();
        } else {
            Swal.fire('Error', 'Failed to reject request.', 'error');
        }
    };

    if (roleLoading || isLoading) return <p className="p-4">Loading...</p>;
    if (role !== 'admin') return <p className="text-red-600 text-center mt-6">Unauthorized access</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Agreement Requests</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Floor</th>
                            <th>Block</th>
                            <th>Room No</th>
                            <th>Rent</th>
                            <th>Requested On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id}>
                                <td>{req.userName}</td>
                                <td>{req.userEmail}</td>
                                <td>{req.floor}</td>
                                <td>{req.block}</td>
                                <td>{req.apartmentNo}</td>
                                <td>৳{req.rent}</td>
                                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => handleAccept(req)}
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(req)}
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
