import axios from "axios";

const LandingPage = ({ currentUser }) => {
    console.log('inside the component', currentUser);
    return <h1>Landing page...</h1>
}

LandingPage.getInitialProps = async () => {
    // We are not using the useRequest hook here as hooks can only be used inside a
    // component and this is not a component.
    const response = await axios.get('/api/users/currentUser');

    return response.data;
}

export default LandingPage;