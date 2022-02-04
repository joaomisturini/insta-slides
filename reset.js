require('dotenv').config();

const db = require('./src/database');
const Post = require('./src/post');

(async () => {
    db.open();

    await Post.deleteMany();

    db.close();
})();
