import OrderCard from "../../components/order-card";

const OrderList = ({ orders = [] }) => {
    const orderList = orders.map((order, index) => (
        <OrderCard key={order.id} {...order} index={index+1} />
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