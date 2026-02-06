const mongoose = require('mongoose');
const { type } = require('os');
const schema = mongoose.Schema;

/* Schemas       */

const IDCounterSchema = new schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    count: {
        type: Number,
        default: 0
    }

})//    Idcounter_schema

const storeSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    access: {
        type: Array,
        default: ['E0'] 
    },
    manager: String,
    contact: String,
    location: String,

})//    store_schema

const managerSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true
    },
    email: String,
    phone: String,
    guarantor: String,
    guarantorPhone: String
})//    manager_schema

const productSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    access: {
        type: String,
        default: 'E0'
    },
    logo: [],
    purchasePrice: String,
    retailPrice: String,
    quantity: String,
})//    prd_schema

const prdStockSchema = new schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    quantity: {
        type: Number,
    },
    storeId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    year: String,
    weekId: String

})//    product_stock_schema

const prdMovementSchema = new schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    data: {
        type: Object,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    reciever: {
        type: String,
        required: true
    },
    approval: {
        type: String,
        default: 'PENDING'
    },
    time:{
        type: Date,
        default: Date.now
    },
    year: String,
    weekId: String
})//    product_movemet_schema

const mktWeek = new schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    weekNo: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    sequenceNum: {
        type: Number,
        unique: true,
        required: true,
    },
    startDate: Date,
    endDate: Date,

})//    date_schema

const inventorySchema = new schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    storeId: {
        type: String,
        required: true
    },
    inventoryCount: {
        type: Object,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    sequenceNum: {
        type: Number,
        unique: true,
        required: true,
    },
    weekId: String,
    year: String,
})//    inventory_schema

const yearSchema = new schema({
    name: {
        type: Number,
        required: true,
        unique: true,
    }
})//    year_schema

const balanceSchema = new schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    modifyCount: {
        type: Number,
        default: 0
    },
    sequenceNum: {
        type: Number,
        unique: true,
    },
    weekInventoryId: String,
    WeekCashTotal: Number,
    data: Object,
    storeId: String,
    year: String,
    weekId: String,
})

const prdMovementModel = mongoose.model('movements', prdMovementSchema);
const inventoryModel = mongoose.model('inventory_counts', inventorySchema)
const IDCounterModel = mongoose.model('counter', IDCounterSchema)
const prdStockModel = mongoose.model('stocks', prdStockSchema);
const managerModel = mongoose.model('managers', managerSchema);
const productModel = mongoose.model('products', productSchema);
const storeModel = mongoose.model('stores', storeSchema);
const mktWeekModel = mongoose.model('mkt_weeks', mktWeek)
const balanceModel = mongoose.model('weekly_balances', balanceSchema);
const yearModel = mongoose.model('years', yearSchema);


module.exports = {
    storeModel, managerModel, productModel, prdStockModel, prdMovementModel, mktWeekModel,
    inventoryModel, IDCounterModel, yearModel, balanceModel
}