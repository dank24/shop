const router = require('express').Router();
const productCont = require('../controllers/productCont');

/* GET REQUESTS */
router.get('/getproducts', productCont.getProducts)
router.get('/getproductsviaaccess/:access', productCont.getProductsViaAccess)


/* POST REQUESTS */
router.post('/prdmovement', productCont.prdMovements)


module.exports = router