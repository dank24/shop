const router = require('express').Router();
const utilCont = require('../controllers/utilCont')

/* GET */
router.get('/getcurrentweek', utilCont.getCurrentMktDate);
router.get('/getmktweeks', utilCont.getMktWeeks);

/* POST */
router.post('/add', utilCont.addGen)
router.post('/createmktweek', utilCont.createNewMktWeek)

/* DELETE */
router.delete('/delete/:id?/:in', utilCont.deleteGen);

/* EXPORT */
module.exports = router