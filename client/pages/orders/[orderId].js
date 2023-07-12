import { useState, useEffect } from 'react'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm';

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: (payment) => Router.push('/orders')
    })

    useEffect(() => {
        const getClientSecret = async () => {
            const { data } = await axios.post('/api/payments/create-payment-intent', {
                orderId: order.id
            })
            setClientSecret(data.clientSecret);
        }
        setStripePromise(loadStripe('pk_test_51NS3Y4SDaYJ4rTuju2qxr9ICievD3v5ybPqFACdyitvJoBeV7YhdBB01qBqfaU0H72V0ZwizRmcVczyvNLKELrP200nAmhrIuJ'))
        getClientSecret();
    }, [])


    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        }

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        }
    }, [order]);

    if (timeLeft < 0) {
        return <div>Order Expired</div>
    }

    return (
        <div>
            {timeLeft > 0 ? (
                <div>Time left to pay: {timeLeft} seconds</div>
            ) : (
                <div>Order Expired</div>
            )}
            {stripePromise && clientSecret &&
                (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm orderId = {order.id} />
                    </Elements>
                )
            }
            {errors}
        </div>
    )
}

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
}

export default OrderShow;