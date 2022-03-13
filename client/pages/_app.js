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

AppComponent.getInitialProps = (appContext) => {
    console.log('App initial props', Object.keys(appContext))
    // The context inside the custom app component is different from the context inside other
    // components. Here we have an extra property Component. appContext.ctx is the context that
    // is having the req object.
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentUser');
    return data
}

export default AppComponent;