const router = require('express').Router();
const genCont = require('../controllers/utilCont')

/* post */
router.post('/add', genCont.addGen)

module.exports = router