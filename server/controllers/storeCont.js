const { stat } = require('fs');
const {storeModel, inventoryModel, balanceModel, prdMovementModel, IDCounterModel } = require('../models/models');
const {handleBalance} = require('./utilCont')
const asyncHandler = require('express-async-handler')

function re(res, code, status, msg, data ) {
    res.status(code).json({status: status, message: msg, data})
}

exports.getStores = asyncHandler(
    async(req, res, next) => {
        const stores = await storeModel.find().select('name manager contact location id access status -_id');
        if(!stores) return re(res, 404, 'failure', 'resource not found');

        return re(res, 200, 'success', 'resource located', stores);
    }
)

exports.getstoresMininmal = asyncHandler(
    async(req, res, next) => {
        const Stores = await storeModel.find().select('id name -_id');
        if(!Stores) return re(res, 404, 'failure', 'resource not found');
        
        console.log('fen:', Stores)

        return re(res, 200, 'success', 'resource found', Stores);
    }
)

exports.getStore = asyncHandler(
    async(req, res, next) => {
        const storeId = req.params.storeid.toUpperCase();
        
        const Store = await storeModel.findOne({id: storeId}).select("-s_id");
        if(!Store) return re(res, 404, 'failure', 'store not found');

        return re(res, 200, 'success', 'store found', Store)
    }
)

exports.prdMovement = asyncHandler(
    async(req, res, next) => {
        const {type, intra, data} = req.body

        console.log(data)
    }
)

exports.inventoryCount = asyncHandler(
    async(req, res, next) => {
        const {data, storeId, weekId, year} = req.body
        const id = 'INV-' + storeId.toUpperCase() + '-' + weekId

        async function previousWeekExists() {
            try {
                console.log('enum:', id)
                const weekNum = String(Number(weekId.substring(3,5)) - 1).padStart(2,0);
                if(weekNum == '00') return {status: 'success', message: 'first year entry'}

                const week = 'WK-' + weekNum + '-' + year.substring(2)
                const prevId = 'INV-' + storeId.toUpperCase() + '-' + week 
    

                const PREVWEEKDATA = await inventoryModel.findOne({id: prevId})
                if(!PREVWEEKDATA) return {status: 'failure', message: 'no previous week entry '}
                
                return {status: 'success', message:'direct previous entry exists'}

            } catch (error) {
                console.log('PREVWEEKEXISTFN:', '\n' ,error.message )
                return {status: 'error', message: error.message, log: error}
            }
        }
        const check = await previousWeekExists();
        if(check.status !=='success') return re(res, 400, 'failure', check.message);

        const InventoryCount = await inventoryModel.findOne({id: id})
        if(InventoryCount) return re(res, 409, 'failure', 'count for this week exists')

        const sqCount = await IDCounterModel.findOneAndUpdate(
            {name: 'INV'},
            {
                $inc: {count: 1},
                $setOnInsert: {
                    name: 'INV',
                },
            },
            {
                upsert: true,
                new: true
            }
            
        ).select('count -_id')

        const newInventoryCount = await inventoryModel.create({
            id, storeId, weekId, year, inventoryCount: data, sequenceNum: sqCount.count
        });

        const BALANCEOPER = await handleBalance(storeId, weekId, year);
        return re(res, 201, 'success', 'counted added', newInventoryCount) 

        //console.log(data, storeId, weekId)
    }
)

exports.getInventoryStoreCounts = asyncHandler(
    async(req, res, next) => {
        const storeId = req.params.storeid

        function transform(arr) {
            if(arr.length <1) return []
            const arr1 = []

            const weekIds = arr.reduce(
                (acc, current) => {
                    acc = [...acc, current['id'].substring(12, 14)]
                    return acc
                }, []
            )

            console.log('obj1', weekIds)

            const products = Object.keys(arr[0].inventoryCount)
            products.map(prd => {
                const obj = {name: prd, counts: []}

                for(let data of arr) {
                    const valueForWeek = data.inventoryCount[prd]
                    
                    let useValue;
                    valueForWeek !== undefined ? useValue = Number(valueForWeek) :
                    useValue = 0
                    
                    obj.counts.push(useValue)
                }
                arr1.push(obj)
            })

            return {weeks: weekIds, prdCounts: arr1}
        } 

        if(storeId === undefined) {
            const InventoryCounts = await inventoryModel.find().select('-_id -dateCreated')
            return re(res, 200, 'success', 'found inventory', InventoryCounts);

        }

        const InventoryForStore = await inventoryModel.find({storeId: storeId}).select('-storeId -createdAt -_id')
        //console.log('storecont:', storeId, InventoryForStore)
        return re(res, 200, 'success', 'found inventory count fot store', transform(InventoryForStore))


    }
)

exports.calcSales = asyncHandler(
    async(req, res, next) => {
        const {startID, endID, storeID} = JSON.parse(req.params.data);
        const rArr = [];

        if(endID == false) {
            const weekBalanceId = 'BAL-' + storeID + '-' + startID;
            const BALANCEDATA = await balanceModel.findOne({id: weekBalanceId } ).select('data weekId -_id')

            rArr.push(BALANCEDATA);
        }



        console.log('weight:', rArr)
        return re(res, 200, 'success', 'works')
    }
)

