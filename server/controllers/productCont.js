const {productModel } = require('../models/models');
const asyncHandler = require('express-async-handler');

exports.getProducts = asyncHandler(
    async(req, res, next) => {
        const Products = await productModel.find();
        if(!Products) return res.status(404).json({status: 'failure', message: 'resource not located'});

        return res.status(200).json({status: 'success', message: 'resource located', data: Products})
    }
)