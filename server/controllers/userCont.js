const asyncHandler = require('express-async-handler');
const user = require('../models/userModel')
const process = require('process');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = asyncHandler(
    async(req, res, next) => {
        let {name, email, password} = req.body;
        [name, email, password] = [name.toLowerCase(), email.toLowerCase(), password.toLowerCase()];
 
        const existingUser = await user.findOne({name: name}).select('_id');
        if(existingUser) return res.status(409).json({status: 'failure', message: 'user exists'});

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await user.create({name, email, passwordHash});
        if(!newUser) return res.status(500).json({status: 'failure', message: 'failed to register user'});

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '5d'})
        res.status(201).json({status: 'success', message: 'user registered', token});
         
    }   

)

exports.login = asyncHandler(
    async(req, res, next) => {
        const {name, password} = req.body;

        const findUser = await user.findOne({name: name}).select('_id passwordHash');
        if(!findUser) return res.status(400).json({status: 'failure', message: 'user does not exist'})

        const isMatch = await bcrypt.compare(password, findUser.passwordHash);
        if(!isMatch) return res.status(400).json({status: 'failure', message: 'invalid credentials'});

        const token = jwt.sign({id: findUser._id}, process.env.JWT_SECRET, {expiresIn: '5d'});
        return res.status(200).json({status: 'success', message: 'credentials verified', token});
    }
)


