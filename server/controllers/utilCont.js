const { default: mongoose } = require('mongoose');
const {storeModel, productModel, managerModel, datesModel} = require('../models/models');
const models = [storeModel, managerModel, productModel];
const strArr = ['STR', 'MNG', 'PRD']
const asyncHandler = require('express-async-handler');

async function createDate(dateId) {
    dateId = String(dateId).padStart(2, 0)
    const newDate = new Date(Date.now());
    const dateDiff = newDate.getDate() - newDate.getDay();
    const startDateId = newDate.setDate(dateDiff);
    const startDate = new Date(startDateId).toDateString();
    const endDateId = newDate.setDate(dateDiff + 6)
    const endDate = new Date(endDateId).toDateString()
    const year = newDate.getFullYear()

    const save = await datesModel.create({weekId: dateId, year, endDate, startDate});
    if(!save) return false

    return {weekId: save.weekId, startDate: save.startDate, endDate: save.endDate}
}

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

exports.mktDates = asyncHandler(
    async(req, res, next) => {
        const {year, week, start, end} = req.body;

        const Week = await datesModel.findOne({weekId: week})
        if(Week) return res.status(409).json({status: 'failure', message: 'week exists'})

        const newWeek = await datesModel.create({weekId: week, year, startDate: start, endDate: end });
        if(!newWeek) return res.status(500).json({status: 'failure', message: 'server error'});

        return res.status(200).json({status: 'success', message: 'week created', data: week});
    }
)


exports.createNewMktWeek = asyncHandler(
    async(req,res,next) => {
        const weekId = req.body;

        const CREATEDATEFN = await createDate(weekId);
        if(!CREATEDATEFN) return res.status(500).json({status: 'failure', message: 'server erro'})
        
        return res.status(200).json({status: 'success', message: 'mkt week added', data: CREATEDATEFN})
    }
)

exports.getCurrentMktDate = asyncHandler(
    async(req, res, next) => {
        const lastEntry = await datesModel.findOne().sort({_id: -1}).select("weekId endDate -_id");
        if(lastEntry == null) {
            const CREATEDATEFN = await createDate('01')

            if(!CREATEDATEFN) return res.status(404).json({status: 'failure', message: 'server error'})
            
            return res.status(200).json({status: 'success', message: 'mkt week added', data: CREATEDATEFN});
        }

        return res.status(200).json({status: 'success', message: 'found', data: lastEntry})
    }
)
