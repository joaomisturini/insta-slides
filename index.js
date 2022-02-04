require('dotenv').config();

const db = require('./src/database');
const Post = require('./src/post');
const app = require('express')();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => res.render('index'));

app.get('/posts', async (req, res) => {
    const local = req.query.local || false;

    db.open();

    const posts = await Post.find({ local });

    db.close();

    return res.json(posts);
});

app.listen(3000, function () {
    console.log('listening: 3000');
});
