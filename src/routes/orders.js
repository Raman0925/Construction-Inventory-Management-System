const express = require('express');
const router = express.Router();
const {createPurchaseOrder,getPurchaseOrderById,updateOrderStatus } = require('../controllers/orders')
router.post('/',createPurchaseOrder);
router.patch('/',updateOrderStatus);
router.get('/:purchaseorderId',getPurchaseOrderById)
module.exports = router;