const express = require('express');
const router = express.Router();
const errorHandlingMiddleware = require('../middlewares/error-handling');
const merchantSessionMiddleware = require('../middlewares/merchant-session');
const merchantController = require('../controllers/merchant');

router.get('/token', merchantController.generateToken);
router.post('/product', [merchantSessionMiddleware], merchantController.createProduct)
router.put('/product/:productId', [merchantSessionMiddleware], merchantController.updateProduct)
router.delete('/product/:productId', [merchantSessionMiddleware], merchantController.deleteProduct);
router.get('/buyer', [merchantSessionMiddleware], merchantController.listBuyers);

router.use(errorHandlingMiddleware);

module.exports = router;
