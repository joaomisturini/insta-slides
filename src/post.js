const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    url: String,
    local: Boolean,
    video: Boolean,
});

module.exports = mongoose.model('Post', postSchema);
