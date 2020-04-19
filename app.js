const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// products
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://ragib-hasan:'+ process.env.MONGO_ATLAS_PW +'@cluster0-esroh.mongodb.net/test?retryWrites=true&w=majority', 
{
    useMongoClient: true
}
);

/*app.use((req, res, next) => {
    res.status(200).json({
        message: "It Works!"
    });
});*/

// Handling http requests using morgan
app.use(morgan('dev'));

// Json formatting / readable json body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Setting headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routing to handle the requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error Handling
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

// Error from anywhere in this app
app.use((error,req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;