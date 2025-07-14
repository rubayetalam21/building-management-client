import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const paymentInfo = location.state;

    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);

        try {
            const res = await fetch('https://b11a12-server-side-rubayetalam21.vercel.app/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: paymentInfo.rent })
            });

            const { clientSecret } = await res.json();

            const card = elements.getElement(CardElement);
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        email: paymentInfo.email,
                    }
                }
            });

            if (error) {
                Swal.fire('Payment failed', error.message, 'error');
            } else if (paymentIntent.status === 'succeeded') {
                const saveRes = await fetch('https://b11a12-server-side-rubayetalam21.vercel.app/payments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...paymentInfo,
                        transactionId: paymentIntent.id,
                        date: new Date(),
                    })
                });

                if (saveRes.ok) {
                    Swal.fire('Payment successful', 'Your rent has been paid!', 'success');
                    navigate('/dashboard');
                } else {
                    Swal.fire('Error', 'Payment succeeded but failed to store record.', 'error');
                }
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Something went wrong', 'error');
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <CardElement className="mb-4 border p-3 rounded" />
            <button
                type="submit"
                disabled={!stripe || processing}
                className="btn btn-primary w-full"
            >
                {processing ? 'Processing...' : `Pay ৳${paymentInfo?.rent || ''}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
