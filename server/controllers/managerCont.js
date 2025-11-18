const {managerModel } = require('../models/models');
const asyncHandler = require('express-async-handler');

exports.getManagers = asyncHandler(
    async(req, res, next) => {
        const Managers = await managerModel.find().select("name email guarantor guarantorPhone id phone -_id");
        if(!Managers) {
            return res.status(404).json({status: 'failure', message: 'resource not located'})
        }

        return res.status(200).json({status: 'success', message: 'resource located', data: Managers})
    }
)