import buildClient from "./api/build-client";
const LandingPage = ({ currentUser }) => {
    console.log('inside the component', currentUser);
    // axios.get('/api/users/currentUser').catch((err) => {
    //     // We were getting the ECONNREFUSED 127.0.0.1:80 in console so handling this error here
    //     console.log(err.message)
    // });

    return <h1 className="text-3xl">{currentUser ? 'You are signed in' : 'You are not signed in'}</h1>
}

LandingPage.getInitialProps = async (context) => {
    console.log('INISDE THE LANDING PAGE');
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentUser');
    return data;
}

export default LandingPage;