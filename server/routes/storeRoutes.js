const router = require('express').Router();
const storesCont = require('../controllers/storeCont')

/* Get Request */
router.get('/getstores', storesCont.getStores);
router.get('/getstoresminimal', storesCont.getstoresMininmal)
router.get('/getstore/:storeid', storesCont.getStore)

/* Post Request */
router.post('/transfers', storesCont.in_out)


module.exports = router