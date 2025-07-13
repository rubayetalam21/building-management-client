import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);

    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await fetch(`http://localhost:5000/payments/user/${user.email}`);
            if (!res.ok) throw new Error('Failed to fetch payments');
            return res.json();
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <p className="text-center py-10">Loading payment history...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-teal-600">Payment History</h2>
            {payments.length === 0 ? (
                <p className="text-gray-500">No payments found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>Date</th>
                                <th>Month Paid</th>
                                <th>Amount (৳)</th>
                                <th>Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment._id} className="hover:bg-gray-50">
                                    <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                    <td>{payment.month}</td>
                                    <td>{payment.amount || payment.rent}</td>
                                    <td>{payment.transactionId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
