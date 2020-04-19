const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

// Get all prodcuts
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /procucts"
    });
});

// Create a new product
router.post('/', (req, res, next) => {
    /*const product = {
        name: req.body.name,
        price: req.body.price
    };*/

    // creating instance of Product
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    // save product
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST requests to /procucts",
            createdProduct: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

    
});

// View a product info
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From DB", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: "No record found!"});
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    /*if (id === 'special') {
        res.status(200).json({
            message: "You have got a special ID!"
        });
    } else {
        res.status(200).json({
            message: `You have passed id: ${id}`
        });
    }*/    
});

// Update product
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Product Updated!"
    });
});

// Delete product
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Product Deleted!"
    });
});

module.exports = router;