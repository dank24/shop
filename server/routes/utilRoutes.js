const router = require('express').Router();
const utilCont = require('../controllers/utilCont')

/* GET */
router.get('/getgen/:in', utilCont.getGen);
router.get('/getyears', utilCont.getYears);
router.get('/getmktweeks/:year/:skip?', utilCont.getMktWeeks);
router.get('/getweeksforcalc/:storeid', utilCont.getWeeksForCalc);
router.get('/getbalancedelection/:selections', utilCont.getBalanceSelections);

/* POST */
router.post('/add', utilCont.addGen);
router.post('/createyear', utilCont.createYear);

/* UPDATE */
router.delete('/delete/:id?/:in', utilCont.deleteGen);
router.put('/edit/:id/:in', utilCont.editGen);

/* EXPORT */
module.exports = router