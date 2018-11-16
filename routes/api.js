var express = require('express');
var router = express.Router();

var tfGen = require('../api/tfGenerator')
var genbyte = require('../api/genbyte')


router.post('/tfGen',tfGen.gen)
router.post('/genbytecode',genbyte.data)


module.exports = router;
