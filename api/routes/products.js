const express = require('express');
const router = express.Router();

// Get all prodcuts
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /procucts"
    });
});

// Create a new product
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        message: "Handling POST requests to /procucts",
        createdProduct: product
    });
});

// View a product info
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: "You have got a special ID!"
        });
    } else {
        res.status(200).json({
            message: `You have passed id: ${id}`
        });
    }    
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