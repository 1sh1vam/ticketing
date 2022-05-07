import OrderCard from "../../components/order-card";

const OrderList = ({ orders = [] }) => {
    console.count('render order liser');
    console.log('orders', orders);
    const orderList = orders.map((order) => (
        <OrderCard key={order.id} {...order} />
    ))
    return (
        <div className="w-full flex flex-col gap-4">
            {orderList}
        </div>
    )
}

OrderList.getInitialProps = async (context, client) => {
    const { data: orders } = await client.get('/api/orders');

    return { orders };
}

export default OrderList;