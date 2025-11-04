const express = require('express');
const process = require('process');
const mongoose = require('mongoose')
const env = require('dotenv').config();
const user = require('./models/userModel')
const cors = require('cors');

/* variables */
const mongoURL = process.env.MONGO_URL;
const Port = process.env.PORT;

const app = express();

/* import routes */
const userRoutes = require('./routes/userRoutes')


/* use */
app.use(express.json())
app.use(cors({
    origin: '*',
    method: ['POST', 'GET']
}))

/* use routes */
app.use('/user', userRoutes);

/* database */
const dbConnect = mongoose.connect(mongoURL)
.then(resp => console.log('DB ON'))
.catch(err => console.log(err))

/* server */
app.listen(Port, ()=> {
    console.log('server stated on port:', Port)
})