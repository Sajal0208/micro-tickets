import { useEffect } from "react";
import useRequest from "../../../hooks/use-request";
import Router from "next/router";

const Completion = ({ orderId }) => {
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId
        },
        onSuccess: () => Router.push('/orders')
    })


    useEffect(() => {
        doRequest();
    }, [])

    return <h1>Your ticket has been reserved</h1>
}

Completion.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    return { orderId }; 
}

export default Completion;


