const router = require('express').Router();
const storesCont = require('../controllers/storeCont')

/* Get Request */
router.get('/getstores', storesCont.getStores)

/* Post Request */


module.exports = router