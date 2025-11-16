const {storeModel, productModel, managerModel} = require('../models/models');
const models = [storeModel, managerModel, productModel];
const strArr = ['STR', 'MNG', 'PRD']
const asyncHandler = require('express-async-handler');

exports.addGen = asyncHandler(
    async(req, res, next) => {
        const addData = req.body
        const useModel = models[addData.index]

        const checkExisting = await useModel.findOne({name: addData.data.name}).select('_id');
        if(checkExisting) return res.status(409).json({status: 'failure', message: 'duplicate data'});

        const count = await useModel.countDocuments({});
        const id = strArr[addData.index] + String(count + 1).padStart(2, 0);

        const newCollection = await useModel.create({...addData.data, id});
        if(!newCollection){
            return res.status(404).json({status: 'failure', message: 'database error',})  
        }  
    
        return res.status(200).json({status: 'success', message: 'added to collection', data: newCollection})
    }
)