import buildClient from "./api/build-client";
const LandingPage = ({ currentUser }) => {
    return <h1 className="text-3xl">{currentUser ? 'You are signed in' : 'You are not signed in'}</h1>
}

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const response = await client.get('/api/users/currentUser').catch((err) => console.log('err', err));
    return response?.data || {};
}

export default LandingPage;