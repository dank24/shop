const {storeModel } = require('../models/models');
const asyncHandler = require('express-async-handler')

function re(res, code, status, msg, data ) {
    res.status(code).json({status: status, message: msg, data})
}

exports.getStores = asyncHandler(
    async(req, res, next) => {
        const stores = await storeModel.find().select('name manager contact location id access status -_id');
        if(!stores) return re(res, 404, 'failure', 'resource not found');

        return re(res, 200, 'success', 'resource located', stores)
    }
)

exports.getstoresMininmal = asyncHandler(
    async(req, res, next) => {
        const Stores = await storeModel.find().select('name -_id');
        if(!Stores) return re(res, 404, 'failure', 'resource not found');
        
        return re(res, 200, 'success', 'resource found', Stores);
    }
)

exports.getStore = asyncHandler(
    async(req, res, next) => {
        const storeId = req.params.storeid.toUpperCase();
        console.log(storeId)
        
        const Store = await storeModel.findOne({id: storeId}).select("-s_id");
        if(!Store) return re(res, 404, 'failure', 'store not found');

        return re(res, 200, 'success', 'store found', Store)
    }
)

exports.in_out = asyncHandler(
    async(req, res, next) => {
        const {type, intra, data} = req.body

        console.log(data)
    }
)