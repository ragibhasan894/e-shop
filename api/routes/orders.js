const express = require('express');
const router = express.Router();

// Fetch all orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Orders fetched"
    });
});

// Create a new order
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "Order Created"
    });
});

// View an Order
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Order Details",
        orderId: req.params.orderId
    });
});

// Delete an Order
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Order Deleted!",
        orderId: req.params.orderId
    });
});

module.exports = router;