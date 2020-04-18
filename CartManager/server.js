const express = require('express');
//express is frmework to create api with simplicity uising buildin components like routers
const app = express();
//express nodejs app
const bodyParser = require('body-parser');
const cors = require('cors');
//cors is for cross resourcse sharing
const PORT = 4000;
//port no on which you want to run server
const mongoose = require('mongoose');
const Routes = express.Router();
// express router part


//importing models for communication
let Product = require('./Models/product.model');

//attaching plugins to express node app
app.use(cors());
app.use(bodyParser.json());

//app listening to port, confirm
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

//adding/check "/"" route mechanisim GET to loaclserver
//127.0.0.1:4000/
app.get('/', (req,res) => {
    res.send("Hello")
})

//connecting to local mongodb server using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/product', { useNewUrlParser: true });
const connection = mongoose.connection;

//check if connection to local mongo db was success
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//connecting express router to mongodb
app.use('/product', Routes);


//app.get(/)
//127.0.0.1:4000/product
Routes.route('/').get(function(req, res) {
    //operating on table/onject instance
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

Routes.route('/:id').get(function(req, res) {
    //capturing request params
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});

Routes.route('/update/:id').post(function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (!product)
            res.status(404).send("data is not found");
        else
        product.productId = req.body.productId;
        product.name = req.body.name;
        product.price = req.body.price;

        product.save().then(product => {
                res.json('product updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

Routes.route('/add').post(function(req, res) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'product': 'product added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new product failed');
        });
});