const { default: mongoose } = require('mongoose');
const {productModel, prdMovementModel, prdStockModel} = require('../models/models');
const asyncHandler = require('express-async-handler');

async function ChangeShopPrdStk(storeId, data) {
    try {
        const compositeIds = Object.keys(data)
        const operations = compositeIds.map( prd => {
            const id = 'STK-' + prd + '-' + storeId;
            const incrementBy = Number(data[prd]);

            return {
                'updateOne': {
                    'filter': {id: id},
                    'update': {
                        '$inc': {'quantity': incrementBy},
                        '$setOnInsert': {
                            id: id,
                            storeId: storeId,
                            productId: prd,
                        }
                    },
                    'upsert': true
                }
            }
        })

        const updOperations = await prdStockModel.bulkWrite(operations);
        if(!updOperations) return {status: 'failure', message: 'server error'};
        
        return {status: 'success', message: 'STK operations completed successfully'};

    } catch (error) {
        return {status: 'error', message: error.message, errorLog: error  }
    }
    
}

async function checkshopPrdStk(data, storeId) {
    if(data !== typeof(Object)) return {status: 'error', message: 'invalid data provided'}

    try {
        const idsArr = Object.keys(data);
        const compositeIds = idsArr.map(prd => 'STK-' + prd + '-' + storeId );
    
        const getCheckDocs = await prdStockModel.find(
            {id: {$in: compositeIds }}
        ).select('quantity id');
    
        if(!getCheckDocs || getCheckDocs.length == 0) return {status: 'error', message: 'server error'}
    
        const compositeDocs = getCheckDocs.reduce(
            (acc, current) => {
                acc[current.id] = current.quantity;
                return acc
            }, {}
        )
    
        for(let prd in compositeDocs) {
            let id = prd.substring(4,9);
            let quantityInStore = compositeDocs[prd];
            let changeAmount = useObj[id];
    
            if(quantityInStore < changeAmount) {
                return {status: 'failure', message: `request amount greater than availabe on product: ${id}` };
            }
            
        }   
        return {status: 'success', message: 'amount available for transfer'}

    } catch (error) {
        return {status: 'error', message: 'server error', errLog: error};

    }

}

function re(res, status, json){
    return res.status(status).json(json)
}

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
        const {parties, data, weekId} = req.body;
        const docCount = await prdMovementModel.countDocuments({});
        const id = 'PMV-' + parties[0].toUpperCase() + '-' + parties[1].toUpperCase() + '-WK' + weekId; 

        const PMV = await prdMovementModel.findOne({id: id}).select('_id')
        if(PMV) return re(res, 409, {status: 'failure', message: 'entry for this week exists'});

        async function createPrdMVDoc() {
            try {
                const createMovement = await prdMovementModel.create({
                    id: id,
                    sender: parties[0],
                    reciever: parties[1],
                    data: data
                });
                return {status: 'success', message: 'transfer successfull'};
                
            } catch (error) {
                return {status: 'error', message: 'server error', errorLog: error};

            }

        }//     create_prdmv_fn

        if(parties[0] == 'OFFLOAD') {
            const ADDTOSTK = await ChangeShopPrdStk(parties[1], data);
            if(ADDTOSTK.status !== 'success') {
                re(res, 400, {status: ADDTOSTK.status, message: ADDTOSTK.message});
                console.log(ADDTOSTK);
                return;

            };

        } else {
            const check = await checkshopPrdStk(data, parties[0]);
            if(check.status !== 'success') return console.log(check.message);

            const dataObj = {}
            for(prd in data) {
                dataObj[prd] = Number('-' + data[prd])
            }

            const RMFROMSTK = await ChangeShopPrdStk(parties[0], dataObj);
            if(RMFROMSTK.status !== 'success') {
                re(res, 400, {status: 'failure', message: RMFROMSTK.message})
                return console.log(RMFROMSTK);
            };

            const ADDTOSTK = await ChangeShopPrdStk(parties[1], data)
            if(ADDTOSTK.status !== 'success') {
                re(res, 500, {status: ADDTOSTK.message, message: ADDTOSTK.message});
                return console.log(ADDTOSTK);   
            }    
        } 
            
        const CREATEMV = await createPrdMVDoc()
        if(CREATEMV.status !== 'success') {
            re(res, 409, {status: CREATEMV.status, message: CREATEMV.message});
            return console.log(CREATEMV);
        }

        return re(res, 200, {status: 'success', message: 'transfer operations successfull'} );
    }
)