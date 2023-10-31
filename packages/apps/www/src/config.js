const config = {
    development: {
        urls: {
            app: 'http://localhost:5432'
        },
    },
    production: {
        urls: {
            app: 'https://app.akello.io'
        },
    },
};


export default config[process.env.NODE_ENV];