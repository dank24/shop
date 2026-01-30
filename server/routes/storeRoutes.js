const router = require('express').Router();
const storesCont = require('../controllers/storeCont')

/* Get Request */
router.get('/getinventorycounts/:storeid?', storesCont.getInventoryStoreCounts)
router.get('/getstoresminimal', storesCont.getstoresMininmal)
router.get('/getstore/:storeid', storesCont.getStore)
router.get('/getstores', storesCont.getStores);
router.get('/calcsales/:wk01/:wk02', storesCont.calcSales);

/* Post Request */
router.post('/inventorycount', storesCont.inventoryCount);
router.post('/transfers', storesCont.prdMovement);


module.exports = router