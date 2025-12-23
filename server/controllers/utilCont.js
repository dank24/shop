const { default: mongoose } = require('mongoose');
const {storeModel, productModel, managerModel, datesModel, IDCounterModel} = require('../models/models');
const models = [storeModel, managerModel, productModel];
const strArr = ['STR', 'MNG', 'PRD']
const asyncHandler = require('express-async-handler');

function re(res, code, status, message, data) {
    res.status(code).json({status: status, message: message, data: data})
}

async function IDCounter(na) {
    try {
        const GETID = await IDCounterModel.findOneAndUpdate(
            {name: na},
            {$inc: {count: 1} },
            {
                upsert: true,
                lean: true,
                new: true
            }
        )
        return GETID.count

    } catch (error) {
        return {status: 'error', error: error}
    }


}

async function createDate(dateId) {
    try {
        const useDate = String(dateId).padStart(2, 0)
        const newDate = new Date(Date.now());
        const dateDiff = newDate.getDate() - newDate.getDay();
        const startDateId = newDate.setDate(dateDiff);
        const startDate = new Date(startDateId).toDateString();
        const endDateId = newDate.setDate(dateDiff + 6)
        const endDate = new Date(endDateId).toDateString()
        const year = newDate.getFullYear()
    
        const saveDate = await datesModel.create({weekId: useDate, year, endDate, startDate});
        if(!saveDate) return {status: 'failure', message: 'failed to create date'}
    
        return {status: 'success', message: 'created date', data: saveDate}
        
    } catch (error) {
        return {status: 'error', message: 'failed to create date', errLog: error}

    }
   
}

/* ADD, DELETE, EDIT _GEN */
exports.addGen = asyncHandler(
    async(req, res, next) => {
        const addData = req.body
        const useModel = models[addData.index]

        const checkExisting = await useModel.findOne({name: addData.data.name}).select('_id');
        if(checkExisting) return res.status(409).json({status: 'failure', message: 'duplicate data'});

        const useId = await IDCounter(strArr[addData.index]);
        const id = String(useId).padStart(2, 0)

        const newCollection = await useModel.create({...addData.data, id});
        if(!newCollection){
            return res.status(404).json({status: 'failure', message: 'database error',})  
        }  
    
        return res.status(200).json({status: 'success', message: 'added to collection', data: newCollection})
    }
)

exports.deleteGen = asyncHandler(
    async(req, res, next) => {
        const useModel = models[Number(req.params.in)];
        const ID = req.params.id;

        const DELETEOPER = await useModel.deleteOne({id: ID})
        return re(res, 200, 'success', `Deleted` , DELETEOPER)
    }
)

exports.editGen = asyncHandler(
    async(req, res, next) => {
        const useModel = models[Number(req.params.in)];
        const id = req.params.id;
        const data = req.body;

        console.log('data:', data)
        const UPDOPER = await useModel.findOneAndUpdate(
            {id: id},
            {$set: {...data}},
            {new: true}
        )

        return re(res, 200, 'success', 'updated', UPDOPER)
        console.log('index x id:', useModel, data)

    }
)
//

/* OTHER UTILS */
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
        const {weekId} = req.body;

        const CREATEDATEFN = await createDate(weekId);
        if(!CREATEDATEFN) return res.status(500).json({status: 'failure', message: 'server error'})
        
        return res.status(200).json({status: 'success', message: 'mkt week added', data: CREATEDATEFN})
    }
)

exports.getCurrentMktDate = asyncHandler(
    async(req, res, next) => {
        const lastEntry = await datesModel.findOne().sort({_id: -1}).select('weekId endDate -_id');

        if(lastEntry == null) {
            const CREATEDATEFN = await createDate('01');

            if(CREATEDATEFN.status !== 'success') {
                console.log(CREATEDATEFN)
                return res.status(404).json({status: 'failure', message: CREATEDATEFN.message})
            }
            return res.status(200).json(CREATEDATEFN);

        }

        const parsedCurrentDate = Date.parse(new Date(Date.now()));
        const parsedEndDate = Date.parse(lastEntry.endDate);
        const check = parsedCurrentDate < parsedEndDate;

        if(!check) {
            const weekId = Number(lastEntry.weekId) + 1;
            
            const CREATEDATEFN = await createDate(weekId);
            if(CREATEDATEFN.status !== 'success') {
                console.log(CREATEDATEFN);
                return re(res, 400, 'failure', 'server error');
            }
            return re(res, 200, 'success', 'date created', CREATEDATEFN.data);

        }

        return re(res, 200, 'success', 'found date', lastEntry);
    }
)

exports.getMktWeeks = asyncHandler(
    async(req, res, next) => {
        const MKTWEEKS = await datesModel.find().select('-_id -createdAt');

        const useData = MKTWEEKS.map(it => {
            const obj = {
                week: it.weekId, year: it.year, 
                starts: it.startDate.toDateString().substring(4), 
                ends: it.endDate.toDateString().substring(4)
            };

            return obj;
        });

        return re(res, 200, 'success', 'found market weeks', useData);
    }
)
