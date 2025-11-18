const router = require('express').Router();
const managerCont = require('../controllers/managerCont');

/* GET REQUESTS */
router.get('/getmanagers', managerCont.getManagers)


/* POST REQUESTS */



/* EXPORT */
module.exports = router