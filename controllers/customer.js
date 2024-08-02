const jwt = require('jsonwebtoken');
const Product = require('../models/merchant-product');
const Merchant = require('../models/customer-transaction');

exports.generateToken = async (req, res, next) => {
    const customerName = ['Razi', 'Aziz', 'Syahputro', 
        'Aman', 'Tekno', 'Solusi',
        'John', 'Doe', 'Node', 'Javascript'];

    const randomCustomer = customerName[Math.floor(Math.random() * customerName.length)];
    const payloadJwt = {
        user: 'customer',
        name: randomCustomer
    };
    const accessToken = jwt.sign(payloadJwt, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});
    return res.status(200).json({ data: { token: accessToken }});
};

exports.productList = async (req, res, next) => {
    try {
        const products = await Product.findAll({ attributes: ['id', 'name', 'price', 'quantity'] });
        return res.status(200).json({ data: products });
    } catch (err) {
        next(err);
    }
};

exports.buyProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        const payload = {
            customer_name: req.session.name,
            product_name: product.name,
            normal_price: product.price,
        }
        const price = product.price;
        let discountPrice = 0;

        let message = 'Sukses memesan produk';
        if (price > +process.env.FREE_SHIPPING) {
            message += ' dan mendapatkan gratis ongkir'
            payload.free_shipping = 1;
        }
        if (price > +process.env.ABOVE_FIFTY) {
            message += ' dan mendapatkan diskon 10%'
            discountPrice = product.price * +process.env.DISCOUNT_PRICE
        }
        payload.discount_price = discountPrice;
        payload.price = product.price - discountPrice;
        await Merchant.create(payload);
        return res.status(200).json({ message });
    } catch (err) {
        next(err);
    }
};
