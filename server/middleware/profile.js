const user = require('../models/userModel');
const process = require('process')
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({status: 'failure', message: 'no token found'});
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await user.findById(decoded.id).select('-passwordHash')
        if(!req.user) return res.status(404).json({status: 'failure', message: 'user not found'});

        next();

    } catch (error) {
        return res.status(403).json({status: 'failure', message: 'invalid or expired token'});

    }
}