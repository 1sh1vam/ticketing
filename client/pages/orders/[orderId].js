import { useEffect, useState } from "react";

const OrderShow = ({ order }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        }

        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        }
    }, []);

    if (timeLeft <= 0) {
        return <p>Order expired....</p>
    }
    return (
        <div>
            <p>Time left: ${timeLeft}</p>
        </div>
    )
}

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;

    const { data: order } = await client.get(`/api/orders/${orderId}`);

    return { order }
}