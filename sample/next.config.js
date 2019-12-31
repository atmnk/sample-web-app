const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript({
    webpack: (config, options) => {
        const updatedConfig = withSass({
            sassLoaderOptions: {},
        }).webpack(config, options);
        updatedConfig.resolve.symlinks = false;
        updatedConfig.externals = config.externals || ['sqlite3'];
        return updatedConfig;
    }
});