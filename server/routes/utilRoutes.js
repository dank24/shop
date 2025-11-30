const router = require('express').Router();
const utilCont = require('../controllers/utilCont')

/* GET */
router.get('/getcurrentweek', utilCont.getCurrentMktDate);

/* POST */
router.post('/add', utilCont.addGen)
router.post('/createmktweek', utilCont.createNewMktWeek)

/* EXPORT */
module.exports = router