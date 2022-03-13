import '../styles/globals.css';
import buildClient from './api/build-client';

const AppComponent =  ({ Component, pageProps }) => {
    return (
        <div>
            {/* We have a problem here as we need to change header content based on the
            idea if the user is logged in or not. But we are making the currentUser get call
            inside the landinPAge component. We will user AppComponent to get the users here and
            pass it through the props */}
            <h1>Header COmponen</h1>
            <Component {...pageProps} />
        </div>
    )
}

AppComponent.getInitialProps = async (appContext) => {
    console.log('app context', Object.keys(appContext))
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentUser');

    // As soon as we start using the getInititalProps inside the custom app component
    // we can see that getInitialProps in other components never gets triggered.
    // To handle multiple getInitialProps we have to call components getInitialProps
    // here like below.
    const pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    console.log('page props', pageProps);
    return data
}

export default AppComponent;