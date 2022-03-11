import axios from "axios";

const LandingPage = ({ currentUser }) => {
    console.log('inside the component', currentUser);
    axios.get('/api/users/currentUser').catch((err) => {
        // We were getting the ECONNREFUSED 127.0.0.1:80 in console so handling this error here
        console.log(err.message)
    });

    return <h1>Landing page...</h1>
}

LandingPage.getInitialProps = async ({ req }) => {
    // We are not using the useRequest hook here as hooks can only be used inside a
    // component and this is not a component.

    // getInitialProps can also be called from the client when we are routing from the
    // application itself.

    if (typeof window === 'undefined') {
        // If window is undefined then we are inside the server not in the client

        // "ingress-nginx-controller" is the service name of ingress service inside the ingress-nginx namespace.
        // "ingress-nginx" is the namespace
        const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser', {
            headers: req.headers,
            // Sending the whole header coming from the req obect similar to the express req.
        });
        return data

    } else {
        const { data } = await axios.get('/api/users/currentUser');
        return data;
    }

    return {}
}

export default LandingPage;