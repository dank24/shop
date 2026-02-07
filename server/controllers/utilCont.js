const { default: mongoose } = require('mongoose');
const {
    storeModel, productModel, managerModel, mktWeekModel, prdMovementModel,
    IDCounterModel, yearModel, balanceModel, inventoryModel
} = require('../models/models');
const models = [storeModel, managerModel, productModel];
const strArr = ['STR', 'MNG', 'PRD']
const asyncHandler = require('express-async-handler');

function re(res, code, status, message, data) {
    res.status(code).json({status: status, message: message, data: data})
}

async function mktweeksForYear(year) {
    try {
        const newDate = new Date(Date.parse('01-01-' + year));
        if(newDate.toDateString() == 'Invalid Date') return {status: 'error', message: 'invalid date'}

        const dataDiff = newDate.getDate() - newDate.getDay() ;
        let saturday = newDate.setDate(dataDiff);

        const sqCount = await IDCounterModel.findOneAndUpdate(
            {name: 'MKTWEEK'},
            {
                $inc: {count: 1},
                $setOnInsert: {
                    name: 'MKTWEEK'
                }
            },
            {
                upsert: true,
                new: true
            }
        ).select('count -_id')

        const weeksArr = []
        let id = 1
        let sequenceNum = sqCount.count;

        do {
            const obj = {
                id: 'WK-' + String(id).padStart(2, 0) + '-' + String(year).substring(2),
                weekNo: 'week' + ' ' + String(id).padStart(2, 0),
                year: year,
                startDate: new Date(saturday).toDateString(),
                endDate: new Date(saturday + 518400000).toDateString(),
                sequenceNum: sequenceNum
            }
            weeksArr.push(obj);
            sequenceNum = sequenceNum + 1;
            id = id + 1;
            saturday = saturday + 604800000
            
        } while (new Date(saturday).getFullYear() == year);

        const DBOPER = await mktWeekModel.insertMany(weeksArr)
        const UPDSQCOUNT = await IDCounterModel.findOneAndUpdate({name: 'MKTWEEK'}, {$set: {count: sequenceNum}})
        return {status: 'success', data: weeksArr}
        
    } catch (error) {
        console.log(error)
        return {status: 'error', error}
    }

    
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

exports.handleBalance = async function InsertWeeklyBalance(storeId, weekId, year, ty) {
    try {
        const weeklyInboundPrdsCount = {};
        const weeklyOutboundPrdsount = {};

        const prevWeekInventoryCountId = String('INV-' + storeId + '-' + transWeekId() ).toUpperCase();
        const inventoryCountId = String('INV-' + storeId + '-' + weekId).toUpperCase();
        const ID = 'BAL-' + storeId + '-' + weekId;

        const prdMvs = await prdMovementModel.find(
            {weekId: weekId, $or: [{sender: storeId}, {reciever: storeId}]}
        ).select('data sender reciever -_id');
    
        
        const in_out_cumul = prdMvs.reduce(
            (acc, current) => {
                current.reciever == storeId && acc['incoming'].push(current.data);  
                current.sender == storeId && acc['outgoing'].push(current.data);   
                return acc;

            }, {incoming: [], outgoing: []}
        );

        in_out_cumul.incoming.forEach(it => {
            for(let prd in it) {
                weeklyInboundPrdsCount[prd] = (weeklyInboundPrdsCount[prd] ?? 0) + it[prd];
            }
        });

        in_out_cumul.outgoing.map(it => {
            for(let prd in it) {
                weeklyOutboundPrdsount[prd] = (weeklyOutboundPrdsount[prd] ?? 0) + it[prd];
            }
        });

        const prevInventoryCount = await inventoryModel.findOne({id: prevWeekInventoryCountId}).select('inventoryCount id -_id');
        const currentInventoryCount = await inventoryModel.findOne({id: inventoryCountId}).select('inventoryCount id sequenceNum -_id');

        const BalanceData = {
            incomingGoodsForWeek: weeklyInboundPrdsCount,
            outgoingGoodsForWeek: weeklyOutboundPrdsount,
        }

        const CALCSALES = await calculateSale(currentInventoryCount, prevInventoryCount);
        if(CALCSALES.status !== 'success') return console.log('error calcsalesFN', '\n', CALCSALES);

        const sqCount = currentInventoryCount.sequenceNum || 0;
        currentInventoryCount && await IDCounterModel.findOneAndUpdate(
            {name: 'BAL'},
            {$set: {count: sqCount}, $setOnInsert: {name: 'BAL'} },
            {upsert: true, new: true}
        );
        
        const BalanceOper = await balanceModel.findOneAndUpdate(
            {id: ID},
            {
                $set: {
                    data: BalanceData,
                    sequenceNum: sqCount
                },
                $setOnInsert: {
                    id: ID,
                    weekInventoryId: inventoryCountId, 
                    storeId: storeId,
                    weekId: weekId,
                    year: year,
                },
            },
            {
                upsert: true,
                new: true,
            }

        );

        console.log('baby:', prevInventoryCount, '\n', currentInventoryCount)

     /* HELPER FUNCTIONS    */
        function transWeekId() {
            const previous = String(Number(weekId.substring(3,5)) - 1 ).padStart(2,0);
            return 'WK-' + previous + '-' + weekId.substring(6)
        }

        async function calculateSale(obj1, obj2) {
            if(obj1 == null) return console.log({status: 'failure', message: 'current_inventory empty'});
            if(obj1 == null && obj2 == null) return console.log({status: 'failure', message: 'inventorys empty'});
            
            try {
                const PRODUCTS = await productModel.find().select('id retailPrice purchasePrice -_id');

                const usePrds = PRODUCTS.reduce(
                    (acc, current) => {
                        acc.push(current.id)
                        return acc;
                    }, []
                );

                const salesMargin = PRODUCTS.reduce(
                    (acc, cu) => {
                        acc[cu.id] = Number(cu.retailPrice ) - Number(cu.purchasePrice );
                        return acc
                    }, {}
                );

                BalanceData['profitMarginForWeek'] = salesMargin;

                if(obj1.id == 'INV-' + storeId.toUpperCase() + '-' + 'WK-01-' + String(year).substring(2) ) {
                    const soldGoods = usePrds.map(it => {
                        const value = 
                            ( BalanceData.incomingGoodsForWeek[it] ?? 0 ) - 
                        (
                            (obj1.inventoryCount[it] ?? 0 ) + (BalanceData.outgoingGoodsForWeek[it] ?? 0)
                        ); 

                        return {name: it, quantity: value};
                    });

                    const useObj = soldGoods.reduce(
                        (acc, current) => {
                            if(String(current.quantity).startsWith('-') ) acc['status'] = 'inbalance'
                            acc[current.name] = current.quantity;
                            return acc;
                        }, {status: 'balanced'}
                    )

                    BalanceData['soldGoodsForWeek'] = useObj;
                    console.log('singke')
                    return {status: 'success', message: 'sales for week generated', data: useObj};
                }
                
                let sold = usePrds.map(it => {
                    let quantity = 
                        (
                            (BalanceData.incomingGoodsForWeek[it] ?? 0)
                            + 
                            (obj2.inventoryCount[it] ?? 0 )
                        ) - 
                    (   
                        (BalanceData.outgoingGoodsForWeek[it] ?? 0 )
                        +
                        (obj1.inventoryCount[it] ?? 0 )
                    )

                    return {name: it, quantity: quantity};
                })

                const useObj = sold.reduce(
                    (acc, current) => {
                        if(String(current.quantity).startsWith('-') ) acc['status'] = 'inbalance'
                        acc[current.name] = current.quantity;
                        return acc
                    }, {status: 'balance'}
                );

                BalanceData['soldGoodsForWeek'] = useObj;

                //console.log('double', BalanceData)
                return {status:'success', message: 'sales for week generated', data: useObj}
                
            } catch (error) {
                console.log('calcsales() error:', error.message);
                return {status: 'error', message: error.message, log: error};
            }


        }

        return {status: 'success', message: 'Weekly Balance Created'};
        
    } catch (error) {
        return {status: 'error', error: error};

    }

}

/* ADD, DELETE, EDIT _GEN */
exports.addGen = asyncHandler(
    async(req, res, next) => {
        const addData = req.body
        const useModel = models[addData.index]

        const checkExisting = await useModel.findOne({name: addData.data.name}).select('_id');
        if(checkExisting) return res.status(409).json({status: 'failure', message: 'Duplicate Data'});

        const useId = await IDCounter(strArr[addData.index]);
        const id = strArr[addData.index] + String(useId).padStart(2, 0)

        const newCollection = await useModel.create({...addData.data, id});
        if(!newCollection){
            return res.status(404).json({status: 'failure', message: 'Database Error',})  
        }  
    
        return res.status(201).json({status: 'success', message: 'Added To Tollection', data: newCollection.name})
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

exports.getGen = asyncHandler(
    async(req,res,next) => {
        const index = req.params.in;
        const useModel = models[index];

        const GENS = await useModel.find().select('id name -_id');
        return re(res, 200, 'success', 'found resource', GENS);
    }
)
//

/* OTHER UTILS */
exports.createYear = asyncHandler(
    async(req, res, next) => {
        const year = Number(req.body.year);

        const FindYear = await yearModel.findOne({name: year});
        if(FindYear) return re(res, 409, 'failure', 'Entry Exists');

        const createMarketWeeks = await mktweeksForYear(year)
        if(createMarketWeeks.status !== 'success') return re(res, 400, 'failure', 'could not create weeks');

        const newYear = await yearModel.create({name: year});
        return re(res, 201, 'success', 'Entry Created', year); 
    }
)

exports.getYears = asyncHandler(
    async(req, res, next) => {
        const Years = await yearModel.find().select('-_id name').sort('asc');
        const vals = Years.map(it => (it.name ))

        return re(res, 200, 'success', 'data retrieved', vals);
        
    }
)

exports.getMktWeeks = asyncHandler(
    async(req, res, next) => {
        const yearInFocus = req.params.year;
        
        let limit = 0;
        let skipLenght = 0;
        req.params.skip && (skipLenght = Number(req.params.skip), limit = 11 );

        const docCount = await mktWeekModel.countDocuments();
        const MKTWEEKS = await mktWeekModel.find({year: Number(yearInFocus)}).select('-_id -year').skip(skipLenght).limit(limit).lean();
        const transform = MKTWEEKS.map(it => ({id: it.id, week: it.weekNo, starts: it.startDate.toDateString(), ends: it.endDate.toDateString()} ))

        re(res, 200, 'success', 'Data Retrieved', transform)
    }
)

exports.getWeeksForCalc = asyncHandler(
    async(req, res, next) => {
        const storeId = req.params.storeid;

        const BALANCESFORWEEK = await inventoryModel.find({storeId: storeId}).select('weekId -_id ');

        const WEEKSARR = [];
        for(let id of BALANCESFORWEEK) {
            let week = await mktWeekModel.findOne({id: id.weekId}).select('-_id -__v').lean();
            WEEKSARR.push(week)
        };

        const transformWeeksArr = WEEKSARR.map(it => {
            return {
                starts: it.startDate.toDateString(),
                ends: it.endDate.toDateString(),
                week: it.weekNo,
                year: it.year,
                id: it.id
            }
        })

        return re(res, 200, 'success', 'data retrieval success', transformWeeksArr);

    }
)

exports.getBalanceSelections = asyncHandler(
    async(req, res, next) => {
        const {first, second } = JSON.parse(req.params.selections);
        console.log('first:', first, 'second:', second);

        const BALANCES = await balanceModel.find({})
    }
)