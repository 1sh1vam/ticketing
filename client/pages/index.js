const LandingPage = ({ color }) => {
    console.log('inside the component', color);
    return <h1>Landing page...</h1>
}

LandingPage.getInitialProps = () => {
    console.log('inside the server');

    return { color: 'red' }
}

export default LandingPage;