import { useRouter } from "next/router";
import useRequest from "../../hooks/use-request";

const TicketShow = ({ ticket }) => {
    const router = useRouter();

    const { sendRequest, errors, loading } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id,
        },
        onSuccess: (order) => router.push('/orders/[orderId]', `/orders/${order.id}`),
    });
    return (
        <div>
            <h1 className="text-3xl font-bold my-2">{ticket.title}</h1>
            <h3 className="text-xl font-semibold my-2">${ticket.price}</h3>
            {errors?.generic && (
                <ul className="bg-red-400 mt-2 list-disc text-white rounded-md pl-8 pr-5 py-3">
                    {errors.generic}
                </ul>
            )}
            <button
                className="w-full mt-10 flex items-center justify-center max-w-sm bg-indigo-600 text-white py-2 rounded-lg hover:scale-105"
                onClick={() => sendRequest()}
            >
                {loading && (
                    <div className="w-4 h-4 border-2 mr-2 border-t-white border-slate-300 rounded-full animate-spin"></div>
                )}
                Purchase
            </button>
        </div>
    )
};

TicketShow.getInitialProps = async (context, client) => {
    const { ticketId } = context.query;

    const { data: ticket } = await client.get(`/api/tickets/${ticketId}`);

    return { ticket }
}

export default TicketShow;