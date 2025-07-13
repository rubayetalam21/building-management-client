import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { getIdToken } from 'firebase/auth';
import Swal from 'sweetalert2';

const MakePayment = () => {
    const { user } = useContext(AuthContext);
    const [agreement, setAgreement] = useState(null);
    const [month, setMonth] = useState('');
    const [coupon, setCoupon] = useState('');
    const [discountedRent, setDiscountedRent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applyingCoupon, setApplyingCoupon] = useState(false);
    const [couponApplied, setCouponApplied] = useState(false);
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
                setDiscountedRent(data.rent.toFixed(2)); // initially full rent
            } catch (error) {
                console.error('Error fetching agreement:', error.message);
                Swal.fire('Error', error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) fetchAgreement();
    }, [user]);

    const handleApplyCoupon = async () => {
        if (!coupon) {
            Swal.fire('Please enter a coupon code', '', 'info');
            return;
        }
        setApplyingCoupon(true);
        try {
            const res = await fetch(`http://localhost:5000/coupons/${coupon}`);
            if (!res.ok) throw new Error('Invalid or expired coupon');
            const data = await res.json();
            const discount = (agreement.rent * data.discountPercentage) / 100;
            const newRent = agreement.rent - discount;

            console.log(data, discount, newRent);

            setDiscountedRent(newRent.toFixed(2));
            setCouponApplied(true);
            Swal.fire('Coupon applied!', `You got ${data.discountPercentage}% off.`, 'success');
        } catch (error) {
            console.error(error.message);
            Swal.fire('Error', error.message, 'error');
            setDiscountedRent(agreement.rent.toFixed(2)); // Reset discount on error
            setCouponApplied(false);
        } finally {
            setApplyingCoupon(false);
        }
    };

    const handleRemoveCoupon = () => {
        setCoupon('');
        setDiscountedRent(agreement.rent.toFixed(2));
        setCouponApplied(false);
    };

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
                rent: Number(discountedRent),
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
                    <label>Original Rent (৳)</label>
                    <input
                        type="text"
                        value={agreement.rent.toFixed(2)}
                        readOnly
                        className="input input-bordered w-full mb-2"
                    />
                    {couponApplied && (
                        <input
                            type="text"
                            value={discountedRent}
                            readOnly
                            className="input input-bordered w-full text-green-700 font-bold mb-2"
                            aria-label="Discounted Rent"
                        />
                    )}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        className="input input-bordered w-full"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        disabled={applyingCoupon}
                    />
                    <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="btn btn-outline btn-info"
                        disabled={applyingCoupon}
                    >
                        {applyingCoupon ? 'Applying...' : 'Apply'}
                    </button>
                    {couponApplied && (
                        <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="btn btn-outline btn-warning"
                        >
                            Remove Coupon
                        </button>
                    )}
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
