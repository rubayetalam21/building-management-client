import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { getIdToken } from 'firebase/auth';
import Swal from 'sweetalert2';

const MakePayment = () => {
    const { user } = useContext(AuthContext);
    const [agreement, setAgreement] = useState(null);
    const [month, setMonth] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAgreement = async () => {
            try {
                const token = await getIdToken(user);
                const res = await fetch(`http://localhost:5000/agreements/user/${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error('Unauthorized or no agreement found');

                const data = await res.json();
                setAgreement(data);
            } catch (error) {
                console.error('Error fetching agreement:', error.message);
                Swal.fire('Error', error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) fetchAgreement();
    }, [user]);

    const handlePay = (e) => {
        e.preventDefault();
        if (!month) {
            Swal.fire('Please select a month before proceeding', '', 'warning');
            return;
        }

        navigate('/dashboard/payment', {
            state: {
                email: user.email,
                floor: agreement.floor,
                block: agreement.block,
                apartmentNo: agreement.apartmentNo,
                rent: agreement.rent,
                month,
            },
        });
    };

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Loading agreement info...</p>;
    }

    if (!agreement) {
        return <p className="text-center text-red-500 mt-10">No agreement found for this account.</p>;
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow p-6 rounded mt-8">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Make Payment</h2>
            <form onSubmit={handlePay} className="space-y-4">
                <div>
                    <label>Email</label>
                    <input type="text" value={user.email} readOnly className="input input-bordered w-full" />
                </div>
                <div>
                    <label>Floor</label>
                    <input type="text" value={agreement.floor} readOnly className="input input-bordered w-full" />
                </div>
                <div>
                    <label>Block</label>
                    <input type="text" value={agreement.block} readOnly className="input input-bordered w-full" />
                </div>
                <div>
                    <label>Room No</label>
                    <input type="text" value={agreement.apartmentNo} readOnly className="input input-bordered w-full" />
                </div>
                <div>
                    <label>Rent (৳)</label>
                    <input type="text" value={agreement.rent} readOnly className="input input-bordered w-full" />
                </div>
                <div>
                    <label>Month</label>
                    <select
                        className="select select-bordered w-full"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required
                    >
                        <option value="">Select Month</option>
                        {[
                            'January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December',
                        ].map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-success w-full">Pay</button>
            </form>
        </div>
    );
};

export default MakePayment;
