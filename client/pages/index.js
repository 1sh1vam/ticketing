import buildClient from "../api/build-client";
const LandingPage = ({ currentUser, tickets }) => {
    const ticketList = tickets.map((ticket) => (
        <TicketCard key={ticket.id} {...ticket} />
    ))
    return (
        <div className="w-full max-w-lg py-5 grid grid-cols-4 gap-4">
            {ticketList}
        </div>
    )
}

LandingPage.getInitialProps = async (context, client) => {
    const { data: tickets } = await client.get('/api/tickets');

    return { tickets }
}

export default LandingPage;