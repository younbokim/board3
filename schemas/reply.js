const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    postId: Number,
    commentsId: {
        type: Number,
        unique: true,
    },
    nickname: String,
    comment: String,
    Date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Reply', ReplySchema);
