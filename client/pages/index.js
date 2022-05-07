import buildClient from "../api/build-client";
const LandingPage = ({ currentUser }) => {
    console.log('current user', currentUser);
    return <h1 className="text-3xl">{currentUser ? 'You are signed in' : 'You are not signed in'}</h1>
}

LandingPage.getInitialProps = async (context) => {
    return {};
}

export default LandingPage;