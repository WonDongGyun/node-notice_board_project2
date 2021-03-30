const mongoose = require('mongoose');

const { Schema } = mongoose;
const boardSchema = new Schema({
    boardId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    day: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('board', boardSchema);