import { useEffect, useState } from "react";
import StripeCheckOut from 'react-stripe-checkout';
import { STRIPE_KEY } from '../../constants/stripe-key';
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const { sendRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id,
        },
        onSuccess: (payment) => console.log('payments', payment),
    });

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
    }, []);

    if (timeLeft < 0) {
        return <p>Order expired....</p>
    }
    return (
        <div className="flex flex-col gap-5">
            <p>Time left: {timeLeft}</p>
            <StripeCheckOut
                token={(token) => sendRequest({ token: token.id })}
                stripeKey={STRIPE_KEY}
            />
            {errors?.generic && (
                <ul className="bg-red-400 mt-2 list-disc text-white rounded-md pl-8 pr-5 py-3">
                    {errors.generic}
                </ul>
            )}
        </div>
    )
}

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;

    const { data: order } = await client.get(`/api/orders/${orderId}`);

    return { order }
}

export default OrderShow;