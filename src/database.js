const mongoose = require('mongoose');

module.exports = (() => {
    const _config = {
        host: 'database',
        port: '27017',
        user: 'root',
        password: '123456',
    };

    const open = () => {
        const fullHost = `${ _config.host }:${ _config.port }`;
        const credentials = `${ _config.user }:${ _config.password }`;

        mongoose.connect(`mongodb://${ credentials }@${ fullHost }`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    };

    const close = () => {
        mongoose.connection.close()
    };

    return { open, close };
})();
