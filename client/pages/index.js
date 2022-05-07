import buildClient from "../api/build-client";
const LandingPage = ({ currentUser, tickets }) => {
}

LandingPage.getInitialProps = async (context, client) => {
    const { data: tickets } = await client.get('/api/tickets');

    return { tickets }
}

export default LandingPage;