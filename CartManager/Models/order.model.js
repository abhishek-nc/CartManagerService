const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose is a client side framework to create table and schemes 

//creating schema
let Order = new Schema({
    orderId: {
        type: String
    },
    productId: {
        type: [String]
    },
    amount: {
        type: Number
    },
    date: {
        type: String
    },
    address: {
        type: String
    }
});

//adding schema to db with tablename and object type
module.exports = mongoose.model('Order', Order);