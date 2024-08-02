const express = require('express');
const router = express.Router();
const errorHandlingMiddleware = require('../middlewares/error-handling');
const customerSessionMiddleware = require('../middlewares/customer-session');
const customerController = require('../controllers/customer');

router.get('/token', customerController.generateToken);
router.get('/products', [customerSessionMiddleware], customerController.productList);
router.post('/buy/:productId', [customerSessionMiddleware], customerController.buyProduct);

router.use(errorHandlingMiddleware);

module.exports = router;
