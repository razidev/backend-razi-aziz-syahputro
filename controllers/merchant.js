const jwt = require('jsonwebtoken');
const Product = require('../models/merchant-product');
const Merchant = require('../models/customer-transaction');

exports.generateToken = async (req, res, next) => {
    const payloadJwt = {
        user: 'merchant'
    };
    const accessToken = jwt.sign(payloadJwt, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});
    return res.status(200).json({ data: { token: accessToken }});
};

exports.createProduct = async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity
        };
        await Product.create(payload);
        return res.status(201).json({ message: 'Sukses menambahkan produk' });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const findProduct = await Product.findByPk(req.params.productId)
        if (!findProduct) {
            return  res.status(400).json({ message: 'produk tidak ditemukan' });
        }
        
        findProduct.name = req.body.name;
        findProduct.price = req.body.price;
        findProduct.quantity = req.body.quantity;
        
        await findProduct.save();
        return res.status(200).json({ message: 'Sukses update produk' });
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const findProduct = await Product.findByPk(req.params.productId)
        if (!findProduct) {
            return  res.status(400).json({ message: 'produk tidak ditemukan' });
        }

        await findProduct.destroy();
        return res.status(200).json({ message: 'Sukses menghapus produk' });
    } catch (err) {
        next(err);
    }
};

exports.listBuyers = async (req, res, next) => {
    try {
        const customers = await Merchant.findAll({ attributes: ['customer_name', 'product_name']});
        return res.status(200).json({ data: customers });
    } catch (err) {
        next(err);
    }
};
