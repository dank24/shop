const router = require('express').Router();
const productCont = require('../controllers/productCont');

/* GET REQUESTS */
router.get('/getproducts', productCont.getProducts)


/* POST REQUESTS */


module.exports = router