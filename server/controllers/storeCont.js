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