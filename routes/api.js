var express = require('express');
var router = express.Router();

var tfGen = require('../api/tfGenerator')

router.post('/tfGen',tfGen.gen)


module.exports = router;
