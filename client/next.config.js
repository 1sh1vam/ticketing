// This is a fix to next file changes not getting detected by the kubernetes continaer
// By using this config it will look for the changes every 300 milliseconds.
module.exports = {
    webpackDevMiddleware: (config) => {
        config.watchOptions.poll = 300
        return config;
    }
}