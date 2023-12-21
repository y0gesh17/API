const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,  // Assuming content is a string, adjust accordingly
        required: true
    },
    creator: {
        type: Object,  // Assuming creator is an object, adjust accordingly
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
