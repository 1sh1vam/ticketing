import { useRouter } from 'next/router';
import '../styles/globals.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
import { NON_HEADER_PAGES } from '../constants/page-config';

const AppComponent =  ({ Component, pageProps, currentUser }) => {
    const router = useRouter()
    return (
        <div>
            {!NON_HEADER_PAGES.includes(router.pathname) && <Header currentUser={currentUser} />}
            <Component {...pageProps} currentUser={currentUser} />
        </div>
    )
}

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const response = await client.get('/api/users/currentUser').catch((err) => console.log(err.message));
    const data = response?.data || {};
    // As soon as we start using the getInititalProps inside the custom app component
    // we can see that getInitialProps in other components never gets triggered.
    // To handle multiple getInitialProps we have to call components getInitialProps
    // here like below.

    let pageProps = {};
    // There might be few components which does not have any getInitialProps at all.
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, currentUser)
    }

    return {
        pageProps,
        ...data,
    };
}

export default AppComponent;