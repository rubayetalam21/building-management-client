import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useUserRole from '../hooks/useUserRole';
import { AuthContext } from '../Provider/AuthProvider';

const ManageCoupons = () => {
    const { user } = useContext(AuthContext);
    const { role, isLoading: roleLoading } = useUserRole();
    const [showModal, setShowModal] = useState(false);

    const fetchCoupons = async () => {
        const token = await user.getIdToken();
        const res = await fetch('http://localhost:5000/coupons', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.json();
    };

    const { data: coupons = [], refetch, isLoading } = useQuery({
        queryKey: ['coupons'],
        queryFn: fetchCoupons,
        enabled: !!user
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const couponCode = form.code.value.trim();
        const discount = parseFloat(form.discount.value);
        const description = form.description.value.trim();
        const coupon = { couponCode, discount, description };

        const token = await user.getIdToken();

        const res = await fetch('http://localhost:5000/coupons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(coupon),
        });

        if (res.ok) {
            Swal.fire('Success', 'Coupon added successfully!', 'success');
            setShowModal(false);
            refetch();
            form.reset();
        } else {
            Swal.fire('Error', 'Failed to add coupon', 'error');
        }
    };

    const handleToggleAvailability = async (coupon) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: `You want to mark this coupon as ${coupon.available ? 'inactive' : 'active'}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        });

        if (!confirm.isConfirmed) return;

        const token = await user.getIdToken();

        const res = await fetch(`http://localhost:5000/coupons/${coupon._id}/availability`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ available: !coupon.available }),
        });

        if (res.ok) {
            Swal.fire('Updated!', 'Coupon availability updated.', 'success');
            refetch();
        } else {
            Swal.fire('Error', 'Failed to update availability', 'error');
        }
    };

    if (isLoading || roleLoading) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-teal-700">🎁 Manage Coupons</h2>
                {role === 'admin' && (
                    <button onClick={() => setShowModal(true)} className="btn btn-primary">
                        + Add Coupon
                    </button>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>Coupon Code</th>
                            <th>Discount (%)</th>
                            <th>Description</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((c) => (
                            <tr key={c._id}>
                                <td>{c.couponCode}</td>
                                <td>{c.discount}%</td>
                                <td>{c.description}</td>
                                <td>
                                    <button
                                        onClick={() => handleToggleAvailability(c)}
                                        className={`btn btn-sm ${c.available ? 'btn-success' : 'btn-outline'}`}
                                    >
                                        {c.available ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {showModal && role === 'admin' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add New Coupon</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input name="code" placeholder="Coupon Code" required className="input input-bordered w-full" />
                            <input
                                name="discount"
                                type="number"
                                placeholder="Discount Percentage"
                                min="1"
                                max="100"
                                required
                                className="input input-bordered w-full"
                            />
                            <textarea
                                name="description"
                                placeholder="Coupon Description"
                                required
                                className="textarea textarea-bordered w-full"
                            ></textarea>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;
