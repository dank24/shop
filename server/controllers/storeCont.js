const { stat } = require('fs');
const {storeModel, inventoryModel, balanceModel, productModel, prdMovementModel, IDCounterModel } = require('../models/models');
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
        let rArr;

        const startBALID ='BAL-' + storeID + '-' + startID;
        const endBALID = 'BAL-' + storeID + '-' + endID;

        const PRODUCTS = await productModel.find().select('id name -_id');

        if(endID == false) {
            const BALANCEDATA = await balanceModel.findOne({id: startBALID } ).select('data weekId -_id');
            const transformBalance = PRODUCTS.map(it => {
                let acc = {name: it.name}

                for(let cate in BALANCEDATA.data) {
                    acc[cate] = (BALANCEDATA.data[cate][it.id] ?? 0 )
                }

                const useObj = { 
                    name: acc['name'],
                    inbound: acc['incomingGoodsForWeek'], 
                    outbound: acc['outgoingGoodsForWeek'], 
                    sold: acc['soldGoodsForWeek'],
                    profit: acc['profitMarginForWeek'] * Number(acc['soldGoodsForWeek'] )
                }

                return useObj
            })

            //return console.log('tonight:', PRODUCTS, '\n', BALANCEDATA, 'send\n', transformBalance)
            return re(res, 200, 'success', 'resource located', transformBalance)
        }

        const startTarget = await balanceModel.findOne({id: startBALID}).select('sequenceNum -_id');
        const endTarget = await balanceModel.findOne({id: endBALID}).select('sequenceNum -_id');

        if(!startTarget && !endTarget) return re(res, 400, 'failure', 'start or end dates invalid');

        rArr = await balanceModel.find({
            sequenceNum: {
                $gte: startTarget.sequenceNum,
                $lte: endTarget.sequenceNum
            }
        }).sort({sequenceNum: 1}).select('weekId data -_id ');

        const transformArr = PRODUCTS.map(it => {
            // cumulative data
            let acc = {
                name: it.name,
                inbound: 0,
                outbound: 0,
                sold: 0,
                profit: 0,
            }

            rArr.forEach(its => {
                acc['inbound'] = (its.data['incomingGoodsForWeek'][it.id] ?? 0 ) + acc['inbound'];
                acc['outbound'] = (its.data['outgoingGoodsForWeek'][it.id] ?? 0) + acc['outbound'];
                acc['sold'] = (its.data['soldGoodsForWeek'][it.id] ?? 0) + acc['sold'];

                acc['profit'] = ((its.data['soldGoodsForWeek'][it.id] ?? 0 ) * (its.data['profitMarginForWeek'][it.id] ?? 0) ) + acc['profit']

            }) 

            return acc
        })

        //console.log('rend', startTarget, endTarget,)
        //console.log('soak', PRODUCTS, transformArr)
        return re(res, 200, 'success', 'resources located', transformArr);
        
    }
)

