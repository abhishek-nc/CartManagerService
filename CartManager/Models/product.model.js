const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    productId: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model('Product', Product);