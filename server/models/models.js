const mongoose = require('mongoose');
const schema = mongoose.Schema;

/* Schemas       */

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
    price: String,
    quantity: String,
})//    prd_schema

const prdStockSchema = new schema({
    Id: {
        type: String,
        unique: true,
        required: true
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
    quantity: String,
})//    product_stock_schema

const prdMovementSchema = new schema({
    id: {
        type: String, 
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    changeAmount: {
        type: Number,
        required: true
    },
    party: {
        type: String
    },
    approval: {
        type: String,
        default: 'PENDING'
    },
    time:{
        type: Date,
        default: Date.now
    }
})//    product_movemet_schema

const datesSchema = new schema({
    weekId: {
        type: String,
        unique: true,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    startDate: Date,
    endDate: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const prdMovementModel = mongoose.model('movements', prdMovementSchema);
const prdStockModel = mongoose.model('stocks', prdStockSchema);
const managerModel = mongoose.model('managers', managerSchema);
const productModel = mongoose.model('products', productSchema);
const storeModel = mongoose.model('stores', storeSchema);
const datesModel = mongoose.model('dates', datesSchema)


module.exports = {storeModel, managerModel, productModel, prdStockModel, prdMovementModel, datesModel}