const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true

    },
    city: {
        type: String,
        required: true

    },
    phone: {
        type: String,
        required: true,

    },
    img: {
        type: String,


    },
    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);