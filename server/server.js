const express = require('express');
const process = require('process');
const mongoose = require('mongoose')
const env = require('dotenv').config();
const user = require('./models/userModel')
const cors = require('cors');
const {storeModel} = require('./models/models')

console.log(storeModel)

/* VARIABLES */
const mongoURL = process.env.MONGO_URL;
const Port = process.env.PORT;

const app = express();

/* IMPORT ROUTES */
const managerRoutes = require('./routes/managerRoute');
const producRoutes = require('./routes/productRoutes');
const storesRoutes = require('./routes/storeRoutes');
const userRoutes = require('./routes/userRoutes');
const utilRoutes = require('./routes/utilRoutes');

/* USE */
app.use(express.json())
app.use(cors({
    origin: '*',
    method: ['POST', 'GET']
}))

/* USE ROUTES */
app.use('/manager', managerRoutes);
app.use('/product', producRoutes);
app.use('/store', storesRoutes);
app.use('/user', userRoutes);
app.use('/utils', utilRoutes);

/* database */
const dbConnect = mongoose.connect(mongoURL)
.then(resp => console.log('DB ON'))
.catch(err => console.log(err))
 
/* server */
app.listen(Port, ()=> {
    console.log('server stated on port:', Port)
})