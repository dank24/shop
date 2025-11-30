const {productModel, prdMovementModel} = require('../models/models');
const asyncHandler = require('express-async-handler');

exports.getProducts = asyncHandler(
    async(req, res, next) => {
        const Products = await productModel.find();
        if(!Products) return res.status(404).json({status: 'failure', message: 'resource not located'});

        return res.status(200).json({status: 'success', message: 'resource located', data: Products})
    }
)

exports.getProductsViaAccess = asyncHandler(
    async(req, res, next) => {
        const access = req.params.access;

        const Products = await productModel.find({access: access}).select("name price")
        if(!Products) return res.status(404).json({status: 'failure'})
    
        console.log(Products)
    }
) 

exports.prdMovements = asyncHandler(
    async(req, res, next) => {
        const {parties, type, data} = req.body;
        const docCount = await prdMovementModel.countDocuments({});

        //console.log('c:', docCount, 'ty:', type)
    }
)