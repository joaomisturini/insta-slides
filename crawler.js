require('dotenv').config();
const app = require('./src/app');
const db = require('./src/database');

const wrapper = (() => {
    const init = async () => {
        console.log('começou');

        db.open();

        await app.init();

        db.close();

        console.log('terminou');
    };

    return { init };
})();

(async () => {
    setInterval(async () => {
        await wrapper.init();
    }, 1000 * 60 * 2);

    await wrapper.init();
})();
