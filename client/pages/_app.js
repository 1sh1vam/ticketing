import '../styles/globals.css';
import buildClient from './api/build-client';

const AppComponent =  ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            {/* We have a problem here as we need to change header content based on the
            idea if the user is logged in or not. But we are making the currentUser get call
            inside the landinPAge component. We will user AppComponent to get the users here and
            pass it through the props */}
            <h1>Header COmponen {currentUser.email}</h1>
            <Component {...pageProps} />
        </div>
    )
}

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentUser');

    // As soon as we start using the getInititalProps inside the custom app component
    // we can see that getInitialProps in other components never gets triggered.
    // To handle multiple getInitialProps we have to call components getInitialProps
    // here like below.

    let pageProps = {};
    // There might be few components which does not have any getInitialProps at all.
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }

    return {
        pageProps,
        ...data,
    };
}

export default AppComponent;