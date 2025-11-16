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
    manager: String,
    contact: String,
    location: String,
    access: String
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
    logo: [],
    price: String,
    quantity: String,
})//    prd_schema

const storeModel = mongoose.model('stores', storeSchema);
const managerModel = mongoose.model('managers', managerSchema);
const productModel = mongoose.model('products', productSchema);

module.exports = {storeModel, managerModel, productModel}