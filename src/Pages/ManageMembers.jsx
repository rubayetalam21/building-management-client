import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);

const ManageMembers = () => {
    const fetchMembers = async () => {
        const token = await auth.currentUser.getIdToken();
        const res = await fetch('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch users');
        }

        const allUsers = await res.json();
        return allUsers.filter((user) => user.role === 'member');
    };

    const { data: members = [], refetch, isLoading } = useQuery({
        queryKey: ['members'],
        queryFn: fetchMembers,
    });

    const handleRemoveMember = async (id, name) => {
        const confirm = await Swal.fire({
            title: `Remove ${name} as a member?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove',
        });

        if (confirm.isConfirmed) {
            const token = await auth.currentUser.getIdToken();

            const res = await fetch(`http://localhost:5000/users/${id}/role`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role: 'user' }),
            });

            const result = await res.json();

            if (res.ok && result.modifiedCount > 0) {
                Swal.fire('Removed!', `${name} is now a regular user.`, 'success');
                refetch();
            } else {
                Swal.fire('Error', result.message || 'Failed to change role', 'error');
            }
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading members...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-teal-600 mb-4">Manage Members</h2>
            {members.length === 0 ? (
                <p className="text-gray-500">No members found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member._id}>
                                    <td>{member.name}</td>
                                    <td>{member.email}</td>
                                    <td>
                                        <button
                                            onClick={() => handleRemoveMember(member._id, member.name)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Remove Member
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageMembers;
