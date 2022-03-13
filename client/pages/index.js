import buildClient from "./api/build-client";
const LandingPage = ({ currentUser }) => {
    console.log('inside the component', currentUser);
    // axios.get('/api/users/currentUser').catch((err) => {
    //     // We were getting the ECONNREFUSED 127.0.0.1:80 in console so handling this error here
    //     console.log(err.message)
    // });

    return <h1>Landing page...</h1>
}

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentUser');
    return data;
}

export default LandingPage;