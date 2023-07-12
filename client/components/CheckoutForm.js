import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import Router from "next/router";
import { AddressElement } from "@stripe/react-stripe-js";

export default function CheckoutForm({ orderId }) {
    console.log(orderId)
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/orders/completion/${orderId}`
            }
        })

        if(error) {
            setMessage(error.message);
        }

        setIsProcessing(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <AddressElement options={{mode: 'billing'}} />
            <button disabled={isProcessing} id='submit'>
                <span id='button-text'>
                    {isProcessing ? 'Processing...' : 'Pay'}
                </span>
            </button>
            {message && <div id = 'payment-message'>{message}</div>}
        </form>
    )
}