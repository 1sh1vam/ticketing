import { useEffect, useState } from "react";
import StripeCheckOut from 'react-stripe-checkout';
import { STRIPE_KEY } from '../../constants/stripe-key';

const OrderShow = ({ order }) => {
    const [timeLeft, setTimeLeft] = useState(0);

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
                token={(token) => console.log('token', token)}
                stripeKey={STRIPE_KEY}
            />
        </div>
    )
}

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;

    const { data: order } = await client.get(`/api/orders/${orderId}`);

    return { order }
}

export default OrderShow;