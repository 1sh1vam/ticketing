const TicketCard = ({ title, price }) => {
    return (
        <div className="w-full p-5 flex items-start rounded-md justify-between text-md font-md shadow-lg bg-gray-100 text-gray-800 gap-5">
            <p className="m-0">{title}</p>
            <p className="m-0">${price}</p>
        </div>
    )
}

export default TicketCard;