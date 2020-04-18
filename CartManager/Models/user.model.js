const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String
    },
    mobileNo: {
        type: Number
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User', User);