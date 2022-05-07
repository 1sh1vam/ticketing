import Link from "next/link";

const TicketCard = ({ title, price, id }) => {
    return (
        <div className="w-full p-5 flex flex-col items-start rounded-md justify-between text-md font-md shadow-lg bg-gray-100 text-gray-800 gap-2">
            <div>
                <p className="text-xs text-indigo-500">Title</p>
                <p className="m-0">{title}</p>
            </div>
            <div>
                <p className="text-xs text-indigo-500">Price</p>
                <p className="m-0">${price}</p>
            </div>
            <Link href='/tickets/[ticketId]' as={`/tickets/${id}`}>
                <a className="decoration-0 mt-2 w-full tracking-wider text-center py-1 bg-indigo-500 text-white rounded-md last-of-type:mr-0 hover:scale-110">view</a>
            </Link>
        </div>
    )
}

export default TicketCard;