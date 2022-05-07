const OrderCard = ({ index, ticket, status }) => {
    return (
        <div className="flex items-center justify-between gap-4 py-2 px-3 border border-gray-250 rounded-lg shadow-md">
            <div className="flex items-center gap-4 justify-between">
                <p className="m-0 whitespace-nowrap">{index}</p>
                <p className="m-0">{ticket.title}</p>
            </div>
            <p className="m-0">{status}</p>
        </div>
    )
}

export default OrderCard;