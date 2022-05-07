const TicketShow = ({ ticket }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold my-2">{ticket.title}</h1>
            <h3 className="text-xl font-semibold my-2">${ticket.price}</h3>
            <button className="w-full mt-10 max-w-sm bg-indigo-600 text-white py-2 rounded-lg hover:scale-105">Purchase</button>
        </div>
    )
};

TicketShow.getInitialProps = async (context, client) => {
    const { ticketId } = context.query;

    const { data: ticket } = await client.get(`/api/tickets/${ticketId}`);

    return { ticket }
}

export default TicketShow;