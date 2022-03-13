import '../styles/globals.css';
import buildClient from './api/build-client';
import Header from './components/header';

const AppComponent =  ({ Component, pageProps, currentUser }) => {
    console.log('component', Component);
    return (
        <div>
            <Header currentUser={currentUser} />
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